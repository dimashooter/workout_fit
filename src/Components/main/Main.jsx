import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Profile from '../../Pages/Profile';
import Workout from '../../Pages/Workout';
import MainHeader from './MainHeader';

const Main = () => {
  return (
    <div className="w-[50%] bg-[#f3f3f3] min-h-[100vh] pl-[50px] py-8 pr-8 ">
      <MainHeader />
      <div className="mt-10">
        <Routes>
          <Route path="/" element={<Workout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
