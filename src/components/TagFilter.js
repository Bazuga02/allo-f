import React from "react";

function TagFilter({ labels, selectedLabels, setSelectedLabels }) {
  const toggleLabel = (labelId) => {
    setSelectedLabels((prevLabels) =>
      prevLabels.includes(labelId)
        ? prevLabels.filter((id) => id !== labelId)
        : [...prevLabels, labelId]
    );
  };

  return (
    <div className="tag-filter flex flex-wrap gap-2 m-4">
      <div className="flex items-center bg-neutral-950 p-1 rounded-lg w-full sm:w-[8vw] justify-center mb-2 sm:mb-0">
        <img
          src="https://img.icons8.com/?size=100&id=TuZWmysXIs4c&format=png&color=000000"
          alt="menu"
          className="h-8"
        />
        <p className="font-semibold text-white">Menu</p>
      </div>
      {labels.map((label) => (
        <button
          key={label.id}
          onClick={() => toggleLabel(label.id)}
          className={`px-4 py-2 rounded-full font-semibold hover:scale-105 transition-all duration-150 w-full sm:w-auto ${
            selectedLabels.includes(label.id)
              ? "bg-blue-400 text-white hover:bg-blue-600"
              : "bg-white text-black border border-black hover:bg-neutral-200"
          }`}
        >
          {label.label}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;
