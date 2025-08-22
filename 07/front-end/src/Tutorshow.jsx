// import React, {useEffect, useState} from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';


// const Tutorshow = () => {

//     const{lang} = useParams();
//     const navigate = useNavigate();
//     const [tutor, settutor] = useState([]);

//     useEffect(() =>{
//         axios.get(`http://localhost:4000/tutor?lang=${lang}`)
//         .then(res => (res.data))
//         .catch(err => console.error(err));
//     }, [lang])

//   return (
//      <div className="p-6">
//       <h1 className="text-2xl mb-4">Tutors for {lang}</h1>
//       <div className="grid grid-cols-3 gap-4">
//         {tutor.map(tutor => (
//           <div key={tutor.id} className="border p-4 rounded shadow">
//             <h2>{tutor.name}</h2>
//             <p>{tutor.bio}</p>
//             <p>Rate: ${tutor.rate}/hr</p>
//             <button
//               className="bg-blue-500 text-white p-2 mt-2 rounded"
//               onClick={() => navigate(`/calendar/${tutor.id}`)}
//             >
//               Book a Session
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Tutorshow;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tutorshow = () => {
  const { lang} = useParams(); // must match the route param in App.js
  const navigate = useNavigate();
  const [tutor, settutor] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/tutor?lang=${lang}`)
      .then(res => {
        settutor(res.data); // ✅ actually set the state
      })
      .catch(err => console.error(err));
  }, [lang]);

  return (
    <>
    
    <div className="p-6">
      <h1 className="text-2xl mb-4">Tutors for {lang}</h1>
      <div className="grid grid-cols-3 gap-4">
        {tutor.map(tutor => (
          <div key={tutor.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{tutor.name}</h2>
            <p>{tutor.bio}</p>
            <p>Rate: ${tutor.rate}/hr</p>
            <button
              className="bg-blue-500 text-white p-2 mt-2 rounded hover:bg-blue-600"
              onClick={() => navigate(`/calendar/${tutor.id}`)}
            >
              Book a Session
            </button>
          </div>
        ))}
      </div>
    </div>

    </>
  );
};

export default Tutorshow;
