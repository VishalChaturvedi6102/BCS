

import React, { useState } from "react";

function Experience({ formData, setFormData }) {
  const [experience, setExperience] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });

  const addExperience = () => {
    if (experience.company && experience.role) {
      setFormData({
        ...formData,
        experience: [...formData.experience, experience],
      });
      setExperience({ company: "", role: "", duration: "", description: "" });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Work Experience / Internship</h2>
      <input name="company" placeholder="Company" value={experience.company}
        onChange={(e) => setExperience({ ...experience, company: e.target.value })}
        className="block border p-2 mb-2 w-full" />
      <input name="role" placeholder="Role" value={experience.role}
        onChange={(e) => setExperience({ ...experience, role: e.target.value })}
        className="block border p-2 mb-2 w-full" />
      <input name="duration" placeholder="Duration (e.g., Jan 2024 - May 2024)" value={experience.duration}
        onChange={(e) => setExperience({ ...experience, duration: e.target.value })}
        className="block border p-2 mb-2 w-full" />
      <textarea name="description" placeholder="Description"
        value={experience.description}
        onChange={(e) => setExperience({ ...experience, description: e.target.value })}
        className="block border p-2 mb-2 w-full" />
      <button onClick={addExperience} className="bg-blue-500 text-white px-4 py-2">Add Experience</button>
    </div>
  );
}

export default Experience;
