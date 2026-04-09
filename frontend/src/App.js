import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Me from "./pages/me/me";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Me />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;