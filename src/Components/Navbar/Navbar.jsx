import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navbarMenu = useMemo(
    () => [
      { id: 0, name: 'Workout', linkTo: '/' },
      { id: 1, name: 'dashboard', linkTo: 'dashboard' },
      { id: 2, name: 'Profile', linkTo: 'profile' },
    ],
    [],
  );

  return (
    <div className="w-[15%] flex items-center pt-2  h-[100vh] flex-col gap-[100px]">
      <h1 className="font-bold text-3xl text-[#340075]">My Fit</h1>
      <ul className="text-center flex-col gap-3 flex uppercase">
        {navbarMenu.map((item) => {
          return (
            <li key={item.id}>
              <NavLink
                className="block font-bold text-sm text-[#340075] bg-[#f1f1f1] px-8 py-4 rounded-full"
                style={({ isActive }) => {
                  return {
                    color: isActive ? '#ffffff' : '#340075',
                    backgroundColor: isActive ? '#340075' : '#f1f1f1',
                  };
                }}
                to={item.linkTo}>
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
