import React, { useEffect, useState } from "react";

const Apicall = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData({ name: "hello", age: "00" });
    }, 2000);
  }, []);

  return (
    <div>
      {data ? (
        <p>
          {data.name} - {data.age} years old
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Apicall;
