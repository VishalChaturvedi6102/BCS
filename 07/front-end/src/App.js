// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// // App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './Layout';
// import LoginS from './LoginS';
// import SignupS from './SignupS';
// import Auth from './Auth';
// import Dashboard from './Dashboard';
// import Calendar from './Calendar';
// import SignupT from './Tcomponent/SignupT';
// import Teacherdashboard from './Tcomponent/Teacherdashboard';
// import Author from './Tcomponent/Author';
// import Createcourse from './Tcomponent/Createcourse';
// import Frontpage from './Frontpage';
// import Tutorshow from './Tutorshow';
// import Informationteach from './Tcomponent/Informationteach';
// import Booksession from './Booksession';
// import Tutorlist from './Tutorlist';
// import Teacherprofile from './Teacherprofile';
// import Newcourses from './Newcourses';
// import Teachercalendar from './Tcomponent/Teachercalendar';
// // import Navbar from './Tcomponent/Navbar';
// import Privateroutes from './Privateroutes';

// function App() {
//   return (
//     <Router>
//       <Routes>
//       {/* yeah hai PUBLIC ke routes */}
//        <Route path="/auth" element={<Auth />} />
//        <Route path="/author" element={<Author />} />
//        <Route path="/" element={<Frontpage />} />
//         {/* <Route path="/login" element={<LoginS />} />
//         <Route path="/signup" element={<SignupS />} />
//         <Route path="/signupT" element={<SignupT />} /> */}
//           {/* <Route path="/calendar/:tutorid" element={<Calendar />} /> */}
//           <Route path="/tutorshow" element={<Tutorshow />} />



// {/* students ke PRivate routes */}

//         <Route element={<Privateroutes><Layout /></Privateroutes>}></Route>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/calendar" element={<Calendar />} />
//         <Route path="/Tutorwale/:language" element={<Tutorlist />} />
//         <Route path="/booksession/:tutorUsername" element={<Booksession />} />
//          <Route path="/newcourses" element={<Newcourses />} />
      

// {/* teacher ke Private routes */}
//            {/* <Route element={<Privateroutes><Layout /></Privateroutes>}></Route> */}
//          <Route path="/teacherdashboard" element={<Teacherdashboard />} />
//           <Route path="/createcourse" element={<Createcourse />} />
//           <Route path="/informationteach" element={<Informationteach />} />
//           <Route path="/teacherprofile" element={<Teacherprofile />} />
//           <Route path="/Teachercalendar" element={<Teachercalendar />} />
//         </ Route>
                     

// {/* <Route path="/booksession/:tutorUsername" element={<Booksession />} /> */}

         

         
//       </Routes>
//     </Router>
//   );
// }

// export default App;






// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
// import LoginS from './LoginS';
// import SignupS from './SignupS';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
// import SignupT from './Tcomponent/SignupT';
import Teacherdashboard from './Tcomponent/Teacherdashboard';
import Author from './Tcomponent/Author';
import Createcourse from './Tcomponent/Createcourse';
import Frontpage from './Frontpage';
import Tutorshow from './Tutorshow';
import Informationteach from './Tcomponent/Informationteach';
import Booksession from './Booksession';
import Tutorlist from './Tutorlist';
import Teacherprofile from './Teacherprofile';
import Newcourses from './Newcourses';
import Teachercalendar from './Tcomponent/Teachercalendar';
import Privateroutes from './Privateroutes'; // 👈 import this
import Titlewala from './Tcomponent/Titlewala';
import Callpage from './Callpage';
import StudentCallpage from './Studentcallpage';


function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/author" element={<Author />} />
        <Route path="/" element={<Frontpage />} />
        <Route path="/tutorshow" element={<Tutorshow />} />

        {/* STUDENT private routes */}
        <Route element={<Privateroutes><Layout /></Privateroutes>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/Tutorwale/:language" element={<Tutorlist />} />
          <Route path="/booksession/:tutorUsername" element={<Booksession />} />
          <Route path="/newcourses" element={<Newcourses />} />
          <Route path="/student-call/:roomId" element={<StudentCallpage />} />

        </Route>

        {/* TEACHER private routes */}
        <Route element={<Privateroutes><Titlewala /></Privateroutes>}>
          <Route path="/teacherdashboard" element={<Teacherdashboard />} />
          <Route path="/createcourse" element={<Createcourse />} />
          <Route path="/informationteach" element={<Informationteach />} />
          <Route path="/teacherprofile" element={<Teacherprofile />} />
          <Route path="/teachercalendar" element={<Teachercalendar />} />
          <Route path="/call/:roomId" element={<Callpage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;





// // App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './Layout';
// import LoginS from './LoginS';
// import SignupS from './SignupS';
// import Auth from './Auth';
// import Dashboard from './Dashboard';
// import Calendar from './Calendar';
// import SignupT from './Tcomponent/SignupT';
// import Teacherdashboard from './Tcomponent/Teacherdashboard';
// import Author from './Tcomponent/Author';
// import Createcourse from './Tcomponent/Createcourse';
// import Frontpage from './Frontpage';
// import Tutorshow from './Tutorshow';
// import Informationteach from './Tcomponent/Informationteach';
// import Booksession from './Booksession';
// import Tutorlist from './Tutorlist';
// import Teacherprofile from './Teacherprofile';
// import Newcourses from './Newcourses';
// import Teachercalendar from './Tcomponent/Teachercalendar';
// import Privateroutes from './Privateroutes'; 
// import Titlewala from './Tcomponent/Titlewala';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* PUBLIC routes */}
//         <Route path="/auth" element={<Auth />} />
//         <Route path="/author" element={<Author />} />
//         <Route path="/" element={<Frontpage />} />
//         <Route path="/tutorshow" element={<Tutorshow />} />

//         {/* STUDENT private routes */}
//         <Route element={<Privateroutes />}>
//           <Route element={<Layout />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/calendar" element={<Calendar />} />
//             <Route path="/Tutorwale/:language" element={<Tutorlist />} />
//             <Route path="/booksession/:tutorUsername" element={<Booksession />} />
//             <Route path="/newcourses" element={<Newcourses />} />
//           </Route>
//         </Route>

//         {/* TEACHER private routes */}
//         <Route element={<Privateroutes />}>
//           <Route element={<Titlewala />}>
//             <Route path="/teacherdashboard" element={<Teacherdashboard />} />
//             <Route path="/createcourse" element={<Createcourse />} />
//             <Route path="/informationteach" element={<Informationteach />} />
//             <Route path="/teacherprofile" element={<Teacherprofile />} />
//             <Route path="/teachercalendar" element={<Teachercalendar />} />
//           </Route>
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
