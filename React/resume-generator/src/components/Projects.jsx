

import React, { useState } from "react";

function Projects({ formData, setFormData }) {
  const [project, setProject] = useState({
    title: "",
    link: "",
    description: "",
  });

  const addProject = () => {
    if (project.title && project.description) {
      setFormData({
        ...formData,
        projects: [...formData.projects, project],
      });
      setProject({ title: "", link: "", description: "" });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Projects</h2>
      <input name="title" placeholder="Project Title" value={project.title}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
        className="block border p-2 mb-2 w-full" />
      <input name="link" placeholder="Link (optional)" value={project.link}
        onChange={(e) => setProject({ ...project, link: e.target.value })}
        className="block border p-2 mb-2 w-full" />
      <textarea name="description" placeholder="Project Description" value={project.description}
        onChange={(e) => setProject({ ...project, description: e.target.value })}
        className="block border p-2 mb-2 w-full" />
      <button onClick={addProject} className="bg-blue-500 text-white px-4 py-2">Add Project</button>
    </div>
  );
}

export default Projects;
