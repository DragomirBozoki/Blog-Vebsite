// src/components/DropdownMenu.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ title, items }) => {
  const [open, setOpen] = useState(false);

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
        <div className="absolute left-0 mt-2 flex flex-col bg-gray-900 border border-white/10 rounded shadow-lg min-w-[180px] z-50">
          {items.map((item, index) =>
            item.to ? (
              <Link
                key={index}
                to={item.to}
                className="px-4 py-2 text-sm text-white hover:bg-gray-700"
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

export default DropdownMenu;
