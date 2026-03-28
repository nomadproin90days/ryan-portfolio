#!/bin/bash
# Batch Backlink Checker via OpenClaw + Ahrefs Free Tool
# Usage: ./check-backlinks.sh domains.txt [output.csv]
#
# Input: text file with one domain per line
# Output: CSV with DR, backlinks, dofollow %, linking websites, top backlinks

set -euo pipefail

DOMAINS_FILE="${1:-domains.txt}"
OUTPUT_FILE="${2:-backlink-report-$(date +%Y%m%d).csv}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -f "$DOMAINS_FILE" ]; then
  echo "Usage: $0 <domains.txt> [output.csv]"
  echo "  domains.txt = one domain per line (no https://)"
  exit 1
fi

# Ensure browser is running
openclaw browser status >/dev/null 2>&1 || openclaw browser start >/dev/null 2>&1
sleep 1

# CSV header
echo "domain,domain_rating,backlinks,dofollow_pct,linking_websites,lw_dofollow_pct,top_backlink_1,top_backlink_2,top_backlink_3,checked_at" > "$OUTPUT_FILE"

TOTAL=$(wc -l < "$DOMAINS_FILE" | tr -d ' ')
COUNT=0

echo "Checking $TOTAL domains..."
echo ""

while IFS= read -r domain || [ -n "$domain" ]; do
  # Skip empty lines and comments
  [[ -z "$domain" || "$domain" == \#* ]] && continue

  # Clean domain (strip protocol, www, trailing slash)
  domain=$(echo "$domain" | sed 's|https\?://||; s|^www\.||; s|/$||')

  COUNT=$((COUNT + 1))
  echo "[$COUNT/$TOTAL] $domain"

  # Navigate to Ahrefs backlink checker
  openclaw browser navigate "https://ahrefs.com/backlink-checker" >/dev/null 2>&1
  sleep 2

  # Get snapshot to find form refs
  SNAPSHOT=$(openclaw browser snapshot --json 2>/dev/null || echo '{}')

  # Find textbox ref
  TEXTBOX_REF=$(echo "$SNAPSHOT" | python3 -c "
import json,sys
d = json.load(sys.stdin)
snap = d.get('snapshot','')
for line in snap.split('\n'):
    if 'textbox' in line.lower() and ('domain' in line.lower() or 'url' in line.lower() or 'enter' in line.lower()):
        import re
        m = re.search(r'ref=(e\d+)', line)
        if m: print(m.group(1)); break
" 2>/dev/null)

  # Find check backlinks button ref
  BUTTON_REF=$(echo "$SNAPSHOT" | python3 -c "
import json,sys
d = json.load(sys.stdin)
snap = d.get('snapshot','')
for line in snap.split('\n'):
    if 'check backlink' in line.lower() and 'button' in line.lower():
        import re
        m = re.search(r'ref=(e\d+)', line)
        if m: print(m.group(1)); break
" 2>/dev/null)

  if [ -z "$TEXTBOX_REF" ] || [ -z "$BUTTON_REF" ]; then
    echo "  SKIP - could not find form elements"
    echo "$domain,error,,,,,,,,$( date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$OUTPUT_FILE"
    continue
  fi

  # Fill domain and submit
  openclaw browser fill --fields "[{\"ref\":\"$TEXTBOX_REF\",\"type\":\"text\",\"value\":\"$domain\"}]" >/dev/null 2>&1
  openclaw browser click "$BUTTON_REF" >/dev/null 2>&1
  sleep 4

  # Extract results from the sticky results panel
  RESULT=$(openclaw browser evaluate --fn "() => {
    const els = document.elementsFromPoint(400, 50);
    for (const e of els) {
      const t = e.innerText || '';
      if (t.includes('Backlink profile') && t.includes('Linking website')) {
        return t.substring(0, 5000);
      }
    }
    return '';
  }" 2>/dev/null || echo "")

  if [ -z "$RESULT" ] || [ "$RESULT" = '""' ]; then
    # Retry once after waiting
    sleep 3
    RESULT=$(openclaw browser evaluate --fn "() => {
      const els = document.elementsFromPoint(400, 50);
      for (const e of els) {
        const t = e.innerText || '';
        if (t.includes('Backlink profile') && t.includes('Linking website')) {
          return t.substring(0, 5000);
        }
      }
      return '';
    }" 2>/dev/null || echo "")
  fi

  # Parse the result
  ROW=$(echo "$RESULT" | python3 -c "
import sys, re, json

raw = sys.stdin.read().strip()
if not raw or raw == '\"\"':
    print('error,,,,,,,')
    sys.exit(0)

# Remove JSON string quotes
try:
    raw = json.loads(raw)
except:
    pass

lines = raw.split('\n')

dr = ''
backlinks = ''
dofollow_pct = ''
linking_websites = ''
lw_dofollow_pct = ''
top_links = []

i = 0
while i < len(lines):
    line = lines[i].strip()

    if line == 'Domain Rating' and i+1 < len(lines):
        dr = lines[i+1].strip()

    if line == 'Backlinks' and i+1 < len(lines):
        backlinks = lines[i+1].strip()
        # Next non-empty line might have dofollow %
        for j in range(i+2, min(i+4, len(lines))):
            m = re.search(r'(\d+)%\s*dofollow', lines[j])
            if m:
                dofollow_pct = m.group(1)
                break

    if 'Linking website' in line and i+1 < len(lines):
        linking_websites = lines[i+1].strip()
        for j in range(i+2, min(i+4, len(lines))):
            m = re.search(r'(\d+)%\s*dofollow', lines[j])
            if m:
                lw_dofollow_pct = m.group(1)
                break

    # Collect referring page URLs (real backlinks)
    if line.startswith('http') and 'ahrefs.com' not in line and 'chrome.google' not in line:
        # Skip known spam domains
        spam = ['rankpilot','seoagency','rankongoogle','grow-your.website','backlinker.shop',
                'linkbooster','seo-backlink','getwebsiteworth','pagesearch.net','uaewebdirectory',
                'musweb.org','atomizelink','metamagic','blogsphere','quero.party','byteshort',
                'bye.fyi','indians.cc','sitescooponline','tunca.org','backlinkup',
                'runningwebsites','ycm.info','nettools.guru','jake.eu']
        if not any(s in line for s in spam) and len(top_links) < 3:
            top_links.append(line)

    i += 1

# Pad top_links
while len(top_links) < 3:
    top_links.append('')

print(f'{dr},{backlinks},{dofollow_pct},{linking_websites},{lw_dofollow_pct},{top_links[0]},{top_links[1]},{top_links[2]}')
" 2>/dev/null)

  echo "$domain,$ROW,$(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$OUTPUT_FILE"

  # Print summary
  DR=$(echo "$ROW" | cut -d',' -f1)
  BL=$(echo "$ROW" | cut -d',' -f2)
  echo "  DR: $DR | Backlinks: $BL"

  # Rate limit - be respectful
  sleep 2

done < "$DOMAINS_FILE"

echo ""
echo "Done. Report saved to: $OUTPUT_FILE"
echo ""
# Print summary table
echo "=== SUMMARY ==="
column -t -s',' "$OUTPUT_FILE" | head -20
