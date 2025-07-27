

import React, { useState } from "react";

function Skills({ formData, setFormData }) {
  const [input, setInput] = useState("");

  const handleAddSkills = () => {
    const skillsArray = input.split(",").map(skill => skill.trim()).filter(skill => skill);
    setFormData({
      ...formData,
      skills: skillsArray,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Skills</h2>
      <input placeholder="Enter skills comma-separated (e.g., React, Node.js, MongoDB)" value={input}
        onChange={(e) => setInput(e.target.value)} className="block border p-2 mb-2 w-full" />
      <button onClick={handleAddSkills} className="bg-blue-500 text-white px-4 py-2">Add Skills</button>
    </div>
  );
}

export default Skills;
