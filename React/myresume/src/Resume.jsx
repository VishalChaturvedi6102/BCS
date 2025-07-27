
import "./Resume.css";

const Resume = () => {
  return (
    <table
      border="2"
      align="center"
      width="80%"
      cellPadding="10"
      cellSpacing="0"
    >
      <thead>
        <tr>
          <td colSpan="2" align="center" className="thar">
            <h2>Vishal Chaturvedi</h2>
            <p>
              <strong>Email:</strong> vishalchaturvedi6102@gmail.com /{" "}
              <strong>Phone no.:</strong> 7456046882
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/vishal-chaturvedi-6686b1220/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/vishal
              </a>{" "}
              | <strong>GitHub:</strong>{" "}
              <a href="https://github.com/VishalChaturvedi6102">
                github.com/vishal
              </a>
            </p>
          </td>
        </tr>
      </thead>

      <tbody>
        {/* Education */}
        <tr>
          <th colSpan="2" align="left" className="section-header">
            Education
          </th>
        </tr>
        <tr>
          <td>
            <strong>Graduation</strong>
          </td>
          <td>B.Tech in Computer Science, GLA University, 2025</td>
        </tr>
        <tr>
          <td>
            <strong>Intermediate</strong>
          </td>
          <td>St. George’s College Unit - I, Agra, 2021</td>
        </tr>
        <tr>
          <td>
            <strong>High School</strong>
          </td>
          <td>St. George’s College Unit - I, Agra, 2019</td>
        </tr>

        {/* Industrial Training */}
        <tr>
          <th colSpan="2" align="left" className="section-header">
            Industrial Training
          </th>
        </tr>
        <tr>
          <td colSpan="2">
            <strong>
              Job Oriented Value Added Course (JOVAC), GLA University, Mathura
            </strong>
            <br />
            <i>Trainee</i>
            <ul>
              <li>Learned the basics of HTML, CSS, and JavaScript.</li>
              <li>Learned about back-end technologies like NodeJS, ExpressJS, and MongoDB.</li>
              <li>
                Created a project named “E-Commerce Platform” using HTML, CSS,
                JavaScript, ExpressJS, NodeJS, and MongoDB.
              </li>
            </ul>
          </td>
        </tr>

        {/* Projects */}
        <tr>
          <th colSpan="2" align="left" className="section-header">
            Projects
          </th>
        </tr>
        <tr>
          <td colSpan="2">
            <strong>WordToPdf Converter</strong>
            <ul>
              <li>
                Developed a full-stack web application to convert .docx to .pdf.
              </li>
              <li>
                Used Mammoth.js to extract text and HTML-PDF for PDF generation.
              </li>
              <li>
                Stack: HTML, CSS, JavaScript, React, Node.js, Express.js.
              </li>
            </ul>
            <br />
            <strong>Chat Application</strong>
            <ul>
              <li>
                Built a real-time chat app with secure user login and message exchange.
              </li>
              <li>
                Used WebSocket (or Socket.io), MongoDB, and JWT for security.
              </li>
            </ul>
          </td>
        </tr>


                  {/* Skills */}
          <tr>
            <th colSpan="2" className="section-header">
              Skills
            </th>
          </tr>
          <tr>
            <td colSpan="2">
              <p>
                <strong>Technical Skills:</strong> Java, DBMS, OOPS, HTML, CSS,
                JavaScript, NodeJS, ExpressJS, MongoDB <br />
                <strong>Professional Skills:</strong> Adaptability, Agile
                learner, Team player, Multitasking
              </p>
            </td>
          </tr>

          {/* Achievements */}
          <tr>
            <th colSpan="2" className="section-header">
              Achievements
            </th>
          </tr>
          <tr>
            <td colSpan="2">
              <ul>
                <li>Served as a campus ambassador for DEVTOWN</li>
                <li>
                  Recognized as the NPTEL Discipline Star Candidate by Swayam
                  NPTEL.
                </li>
                <li>
                  Acted as a member of the discipline committee during the
                  Spardan Fest, a cultural event at GLA University in 2023
                </li>
                <li>
                  Participated in a workshop on Django, organized by the 0(1)
                  Coding Club.
                </li>
              </ul>
            </td>
          </tr>

          {/* Certificates */}
          <tr>
            <th colSpan="2" className="section-header">
              Certificates
            </th>
          </tr>
          <tr>
            <td colSpan="2">
              <ul>
                <li>
                  Obtained a certification in Cloud Computing through CDAC
                  Future Skill Prime
                </li>
                <li>
                  Acquired certification in Full-Stack Web Development focused
                  on NodeJS from Coding Blocks.
                </li>
              </ul>
            </td>
          </tr>

      </tbody>
    </table>
  );
};

export default Resume;
