import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import CopyBot from "./pages/CopyBot";
import ChatBot from "./pages/ChatBot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/CopyBot" element={<CopyBot />} />
      <Route path="/ChatBot" element={<ChatBot />} />
    </Routes>
  );
}

export default App;
