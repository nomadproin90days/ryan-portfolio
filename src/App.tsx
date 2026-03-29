import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import ContractorsPage from "./pages/CaseStudies/Contractors";
import HealthcarePage from "./pages/CaseStudies/Healthcare";
import Contact from "./pages/Contact";
import Transcriber from "./pages/Transcriber";
import Layout from "./components/Layout";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/contractors" element={<ContractorsPage />} />
          <Route path="/case-studies/healthcare" element={<HealthcarePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/transcriber" element={<Transcriber />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
