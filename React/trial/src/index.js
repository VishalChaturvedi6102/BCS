import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App'; 
// import Spage from './Spage'
// import Mp from './Mp'
// import Addadder from './Addadder';
// import Practice from './Practice';
// import Arrwala from './Arrwala';
// import Abc from './Abc'
// import UpdatingPhaseExample from './useeffectwala';


import Fun from './Fun';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    {/* <Mp/> */}
    {/* <Addadder/> */}
    {/* <Practice/> */}
    {/* <Abc/> */}
    {/* <UpdatingPhaseExample/> */}

    
    <Fun/>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
