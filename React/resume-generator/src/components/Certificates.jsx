import React, { useState } from "react";

function Certificates({ formData, setFormData }) {
  const [certificate, setCertificate] = useState("");

  const addCertificate = () => {
    if (certificate) {
      setFormData({
        ...formData,
        certificates: [...formData.certificates, certificate],
      });
      setCertificate("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Certificates</h2>
      <input placeholder="Enter certificate name" value={certificate}
        onChange={(e) => setCertificate(e.target.value)} className="block border p-2 mb-2 w-full" />
      <button onClick={addCertificate} className="bg-blue-500 text-white px-4 py-2">Add Certificate</button>
    </div>
  );
}

export default Certificates;
