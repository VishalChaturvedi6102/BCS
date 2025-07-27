import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// import App from './App';
// import  './Validform.css';
// import Validform from './Validform';
// import FunctionForms from './FunctionForms';
import reportWebVitals from './reportWebVitals';
// import Pagerouter from './Pagerouter';
// import LoginPage from './LoginPage';
import App from './App';
// import Resumebt from './Resumebt';
// import Formvlad from './Formvlad'

// import DropdownLocation from './DropdownLocation';
// import Fun from './Fun';
// import DefRoute from './DefRoute';
// import Login from './Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
{/* <DropdownLocation/> */}
    {/* <Validform/> */}
    {/* <FunctionForms/> */}
    {/* <Fun/> */}
    {/* <DefRoute/> */}
    {/* <Resumebt/> */}
    {/* <Formvlad/> */}
    {/* <Login/> */}
    <App/>
    {/* <Pagerouter/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
