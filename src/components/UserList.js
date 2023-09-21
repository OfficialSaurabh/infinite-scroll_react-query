// UserList.js
import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
  if (!users) {
    // Handle the case when users is undefined (e.g., during initial loading).
    return null;
  }
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.login.uuid} className="user">
          <Link to={`/user/${user.login.uuid}`}>
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <p>{`${user.name.first} ${user.name.last}`}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserList;
