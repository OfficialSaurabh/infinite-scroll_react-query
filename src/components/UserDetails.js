import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUser = async (id) => {
  const response = await axios.get(`https://randomuser.me/api/?seed=${id}`);
  return response.data.results[0];
};

const UserDetails = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError, error } = useQuery(['user', id], () => fetchUser(id), {
    enabled: !!id,
  });

  return (
    <div className="user-details">
      <h2>User Details</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : !user ? (
        <div>User not found.</div>
      ) : (
        <div>
          <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
          <p>
            <strong>Name:</strong> {`${user.name.first} ${user.name.last}`}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {new Date(user.dob.date).toLocaleDateString()}
          </p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
