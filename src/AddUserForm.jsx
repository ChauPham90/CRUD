import React, { useState } from "react";

const AddUserForm = (props,text) => {
  const initialFormState =  "" ;
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = event => {
   // const { text,value } = event.target;

   // setUser( ...user, text );
  };

  const handleInputSubmit = event => {
    event.preventDefault();
    if (!user) return;
    props.addUser(user);
    setUser(initialFormState);
  };
  return (
    <form onSubmit={handleInputSubmit}>
      <label>Tasks </label>
      <input
        type="text"
        name="name"
        onChange={(e)=> setUser(e.target.value)}
      />
      {/* <label>Username</label>
      <input
        type="text"
        name="username"
        value={user.iscompleted}
        onChange={handleInputChange}
      /> */}
      <button>Add</button>
    </form>
  );
};

export default AddUserForm;
