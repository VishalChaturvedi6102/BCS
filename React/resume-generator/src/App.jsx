import React, { useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Certificates from "./components/Certificates";
import Preview from "./components/Preview";

function App() {
  const [formData, setFormData] = useState({
    personal: {},
    education: [],
    experience: [],
    projects: [],
    skills: [],
    achievements: [],
    certificates: [],
  });

  return (
    <div className="App p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>

      <PersonalInfo formData={formData} setFormData={setFormData} />
      <Education formData={formData} setFormData={setFormData} />
      <Experience formData={formData} setFormData={setFormData} />
      <Projects formData={formData} setFormData={setFormData} />
      <Skills formData={formData} setFormData={setFormData} />
      <Achievements formData={formData} setFormData={setFormData} />
      <Certificates formData={formData} setFormData={setFormData} />

      <hr className="my-6" />
      <Preview data={formData} />
    </div>
  );
}

export default App;
