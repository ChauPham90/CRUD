import React, { useState, useEffect } from "react";
import "./styles.css";
import UserTable from "./UserTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import { createSemicolonClassElement } from "typescript";

const BACKEND_ROOT = "https://full-stack-todolist-m6.herokuapp.com/";

const App = () => {
  const [users, setUsers] = useState([]);
  console.log(users)
  useEffect(() => {
    fetch(BACKEND_ROOT)
      .then(response => response.json())
     // .then(response => console.log(response))
      .then(users => setUsers(users))
      .catch(err => console.error(err));
  }, []);

 

  const addUser = user => {
    fetch(BACKEND_ROOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(user)
    })
      .then(() => {
        setUsers([...users, {user}]);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const deleteUser = id => {
    fetch(`${BACKEND_ROOT}${id}`, { method: "DELETE", mode: "cors" })
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        setEditing(false);
      })
      .catch(err => {
        console.log(err.message);
        console.log(err);
      });

    // setUsers(users.filter(user => user.id !== id));
    //
  };

  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, text: "", iscompleted:false };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, text: user.text, iscompleted: user.iscompleted });
  };

  const updateUser = (id, updatedUser) => {
    console.log(updatedUser);
    fetch(`${BACKEND_ROOT}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      // body: JSON.stringify(updatedUser)
      body: JSON.stringify(updatedUser)
    })
      .then(response => response.json())
      .then(() => {
        setEditing(false);
        setUsers(users.map(user => (user.id === id ? updatedUser : user)));
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add todos</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View todos</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
