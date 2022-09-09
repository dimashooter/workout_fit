import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDashboard } from '../../redux/dashboardSlice';
import Main from '../main/Main';
import Navbar from '../Navbar/Navbar';

const Container = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const exercises = localStorage.getItem('item');
    if (exercises) {
      dispatch(fetchDashboard(exercises));
    }
  }, []);
  return (
    <div className="flex md:gap-2 sm:gap-0">
      <Navbar />
      <Main />
    </div>
  );
};

export default Container;
