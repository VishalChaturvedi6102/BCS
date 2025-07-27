

const Abc = ({ data }) => {
  return (
    <div>
      <h3>Submitted Data:</h3>
      <p><b>Name:</b> {data.name}</p>
      <p><b>Age:</b> {data.age}</p>
      <p><b>Email:</b> {data.email}</p>
      <p><b>Phone:</b> {data.phone}</p>
      <p><b>Gender:</b> {data.gen}</p>
      <p><b>Semester:</b> {data.sem}</p>
    </div>
  );
};

export default Abc;
