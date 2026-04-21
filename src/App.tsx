import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
