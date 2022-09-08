import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <div className="flex gap-2">
      <Navbar />
      <Main />
    </div>
  );
};

export default Container;