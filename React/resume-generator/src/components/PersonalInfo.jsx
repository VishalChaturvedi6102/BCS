

import React from "react";

const PersonalInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      personal: {
        ...formData.personal,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
      <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="block border p-2 mb-2 w-full" />
      <input name="linkedin" placeholder="LinkedIn" onChange={handleChange} className="block border p-2 mb-2 w-full" />
      <input name="github" placeholder="GitHub" onChange={handleChange} className="block border p-2 mb-2 w-full" />
      <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="block border p-2 mb-2 w-full" />
    </div>
  );
}

export default PersonalInfo;
