// User.js
import React from 'react';

const User = ({ user }) => {
  return (
    <div className="user">
      <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
      <p>{`${user.name.first} ${user.name.last}`}</p>
    </div>
  );
};

export default User;
