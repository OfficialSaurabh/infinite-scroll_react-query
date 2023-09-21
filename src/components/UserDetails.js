import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Access the `id` parameter from the route
  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?seed=${id}`);
        setUser(response.data.results[0]); // Assuming the response structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    // Handle the case when user is undefined.
    return <div>Loading user DAETAILS</div>;
  }

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <div>
        <img src={user.picture?.large} alt={`${user.name?.first} ${user.name?.last}`} />
      </div>
      <p>
        <strong>Name:</strong> {`${user.name?.first} ${user.name?.last}`}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Date of Birth:</strong> {user.dob?.date}
      </p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default UserDetails;
