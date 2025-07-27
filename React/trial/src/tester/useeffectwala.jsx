
import React, { useEffect } from "react";
import data from './data';

function UpdatingPhaseExample({ count }) {
  useEffect(() => {
    console.log("Component Updated");
    //  console.log("User Info:", data);
  });


  return (
    <div>Count: {count}
    <br /><br />
    <span>

      User: {data.name}, Age: {data.age}
      
    </span>
    </div>
  );
}

export default UpdatingPhaseExample;
 