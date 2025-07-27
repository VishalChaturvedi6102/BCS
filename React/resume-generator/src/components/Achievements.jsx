

import React, { useState } from "react";

function Achievements({ formData, setFormData }) {
  const [achievement, setAchievement] = useState("");

  const addAchievement = () => {
    if (achievement) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, achievement],
      });
      setAchievement("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Achievements</h2>
      <input placeholder="Enter an achievement" value={achievement}
        onChange={(e) => setAchievement(e.target.value)} className="block border p-2 mb-2 w-full" />
      <button onClick={addAchievement} className="bg-blue-500 text-white px-4 py-2">Add Achievement</button>
    </div>
  );
}

export default Achievements;
