import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefMain from "./DefMain";
import C1 from "./C1";     
import C2 from "./C2";      
import C3 from "./C3";  
import C4 from './C4'; 
import imgscroll from "./imgscroll"; 

function DefRouter() {
  return (
    <div>
    <Router>
      
      <DefMain />

      <Routes>
        <Route path="/home" element={<C1 />} />
        <Route path="/about" element={<C2 />} />
        <Route path="/view" element={<C3 />} />
        <Route path="/contact" element={<C4 />} />
      </Routes>

    </Router>
    </div>
  );
}

export default DefRouter;
