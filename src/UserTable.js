import React from "react";

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Todos</th>
        {/* <th>Completed</th> */}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.text}</td>
           {/* <td>{user.iscompleted}</td> */}
            <td>
              <button
                className="button muted-button"
                onClick={() => props.editRow(user)}
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteUser(user.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserTable;