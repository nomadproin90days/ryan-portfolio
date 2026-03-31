import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          name,
          email,
          tags: ["website-contact-form"],
          source: "Luxetide Studio Website",
          customFields: message
            ? [{ key: "contact_message", field_value: message }]
            : [],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("GHL API error:", err);
      return res.status(502).json({ error: "Failed to submit contact" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
