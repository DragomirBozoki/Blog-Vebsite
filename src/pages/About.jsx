import React from "react";
import { Link } from "react-router-dom";
import { Users, Brain, Rocket } from "lucide-react"; // ikone

// Dropdown komponenta
const DropdownMenu = ({ title, items }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="text-white hover:text-cyan-300 font-medium">
        {title} ▾
      </button>
      {open && (
        <div className="absolute left-0 mt-2 flex flex-col bg-gray-900/95 border border-white/10 rounded-xl shadow-lg min-w-[180px] z-50 backdrop-blur-md">
          {items.map((item, index) =>
            item.to ? (
              <Link
                key={index}
                to={item.to}
                className="px-4 py-2 text-sm text-white hover:bg-gray-700 rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={index}
                className="px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
              >
                {item.label}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans">
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-lg border-b border-white/10 z-50 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <img src="/mindloop_logo_rb.png" alt="MindLoop AI Logo" className="h-16" />
          </Link>

          {/* Meniji */}
          <DropdownMenu
            title="CopyBot"
            items={[
              { to: "/VKCopyBot", label: "VK CopyBot" },
              { to: "/CopyBot", label: "CopyBot Overview" },
            ]}
          />
          <DropdownMenu
            title="AI Assistants"
            items={[
              { to: "/ChatBot", label: "ChatBot" },
              { label: "SaaS Generator (Coming soon)" },
            ]}
          />
          <Link
            to="/about"
            className="text-white hover:text-cyan-300 font-medium"
          >
            About Us
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 pt-32 pb-16 max-w-4xl mx-auto animate-fade-in">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Brain className="w-7 h-7 text-cyan-300" /> About MindLoop AI
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            MindLoop AI is a collaborative project born out of a shared passion for artificial intelligence,
            automation, and building real-world applications that solve communication problems.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-300 mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-200" /> Team
          </h2>
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-cyan-200 font-medium">Maksim Privavlov – Software Engineer</p>
              <p className="text-sm text-gray-400">
                Maksim is a full-stack developer and systems thinker with a strong background in backend architecture.
                He focuses on building reliable infrastructures and designing scalable software systems for AI-driven platforms and our VK CopyBot architecture.
              </p>
            </div>
            <div>
              <p className="text-cyan-200 font-medium">Dragomir Bozoki – ML / DL Engineer</p>
              <p className="text-sm text-gray-400">
                Dragomir brings expertise in computer vision, NLP, and neural networks.
                He developed the deep learning models powering chatbots and intelligent assistants.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-cyan-300 mb-2 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-cyan-200" /> How It Started
          </h2>
          <p className="text-gray-300 leading-relaxed mt-2">
            The idea for MindLoop AI started as an academic project focused on visual speech recognition without audio.
            After months of experimentation, prototyping, and testing, it evolved into a broader initiative to create
            practical AI assistants for real-world use — from chatbots for tourism and e-commerce to CopyBot,
            our tool for automating content workflows.
          </p>

          <p className="mt-6 text-sm text-gray-500">
            🚀 Built with passion, late-night coding sessions, and endless curiosity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
