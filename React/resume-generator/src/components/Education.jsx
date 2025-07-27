
import React, { useState } from "react";

function Education({ formData, setFormData }) {
  const [edu, setEdu] = useState({ institute: "", degree: "", year: "" });

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, edu],
    });
    setEdu({ institute: "", degree: "", year: "" });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Education</h2>
      <input name="institute" placeholder="Institute" value={edu.institute} onChange={(e) => setEdu({ ...edu, institute: e.target.value })} className="block border p-2 mb-2 w-full" />
      <input name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => setEdu({ ...edu, degree: e.target.value })} className="block border p-2 mb-2 w-full" />
      <input name="year" placeholder="Year" value={edu.year} onChange={(e) => setEdu({ ...edu, year: e.target.value })} className="block border p-2 mb-2 w-full" />
      <button onClick={addEducation} className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
    </div>
  );
}

export default Education;
