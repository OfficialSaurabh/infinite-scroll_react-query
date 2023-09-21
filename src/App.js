
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const fetchUsers = async ({ pageParam = 1 }) => {
  const response = await axios.get(`https://randomuser.me/api/?page=${pageParam}&results=10`);
  console.log(response.data.results);
  return response.data.results;
};

function App() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useInfiniteQuery('users', fetchUsers, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 1) return undefined; // No more pages to fetch
      return lastPage + 1;
    },
  });

  const bottomBoundaryRef = useRef(null);

  const handleScroll = () => {
    if (
      bottomBoundaryRef.current &&
      bottomBoundaryRef.current.getBoundingClientRect().top <= window.innerHeight
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isError) {
    return <div>Error loading data...</div>;
  }

  return (
    <Router>
    <div className="app">
      <h1>Infinite Scrolling Demo</h1>
      <Routes>
        <Route path="/" element={<UserList users={data?.pages.flatMap((page) => page)} />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
      {isFetching && <div>Loading...</div>}
      <div ref={bottomBoundaryRef} />
    </div>
  </Router>
  );
}

export default App;
