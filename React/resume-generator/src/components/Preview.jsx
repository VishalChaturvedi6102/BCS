

import React from "react";
import "./Preview.css";

function Preview({ data = {} }) {
  const {
    personal = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    achievements = [],
    certificates = [],
  } = data;

  return (
    <div className="preview-container">
      {/* Header */}
      <div className="preview-header">
        <h1>{personal.name || "Your Name"}</h1>
        <p>
          {personal.phone && `📞 ${personal.phone}`}{" "}
          {personal.linkedin && ` | 🔗 LinkedIn: ${personal.linkedin}`}{" "}
          {personal.github && ` | 💻 GitHub: ${personal.github}`}
        </p>
      </div>

      {/* Section utility */}
      <Section title="Education" data={education} />
      <Section title="Experience / Internships" data={experience} />
      <Section title="Projects" data={projects} />
      <Section title="Skills" data={skills} type="skills" />
      <Section title="Achievements" data={achievements} type="list" />
      <Section title="Certificates" data={certificates} type="list" />
    </div>
  );
}

// Section component
function Section({ title, data, type }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="preview-section">
      <h2>{title}</h2>
      {type === "skills" ? (
        <div className="skills-container">
          {data.map((skill, idx) => (
            <span key={idx} className="skill-tag">{skill}</span>
          ))}
        </div>
      ) : type === "list" ? (
        <ul>
          {data.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        data.map((item, idx) => (
          <div key={idx} className="preview-item">
            <div className="item-header">
              <strong>{item.title || item.institute || item.company}</strong>
              {item.duration && <span className="item-duration">{item.duration}</span>}
            </div>
            {item.role && <div className="item-subtitle">{item.role}</div>}
            {item.degree && <div className="item-subtitle">{item.degree}</div>}
            {item.description && <p>{item.description}</p>}
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.link}
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Preview;
