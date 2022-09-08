import React, { useMemo, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useMedia from '../../hooks/useMedia';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { TbArrowsCross } from 'react-icons/tb';
import useClickOutside from '../../hooks/useClickOutside';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const navbarMenu = useMemo(
    () => [
      { id: 0, name: 'Workout', linkTo: '/' },
      { id: 1, name: 'dashboard', linkTo: 'dashboard' },
      { id: 2, name: 'Profile', linkTo: 'profile' },
    ],
    [],
  );

  const BurgerMenuRef = useRef(null);
  useClickOutside(BurgerMenuRef, () => setActiveMenu(false));
  const changeMedia = useMedia(['(max-width: 900px)', '(min-width: 900px)'], [false, true]);
  return (
    <>
      {changeMedia ? (
        <div className="w-[15%]   flex items-center pt-2  h-[100vh] flex-col gap-[100px]">
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
      ) : (
        <div ref={BurgerMenuRef}>
          <button
            onClick={() => setActiveMenu(!activeMenu)}
            className="absolute top-0 transition-all ease-in-out duration-500 z-10"
            style={{ left: activeMenu ? '50vw' : '0' }}>
            {activeMenu ? <TbArrowsCross size={'40px'} /> : <HiOutlineMenuAlt1 size={'40px'} />}
          </button>
          <div
            className="absolute top-0 left-[-100%] w-[50vw] bg-slate-400 h-[100vh] transition-all ease-in-out duration-500 z-10 flex flex-col justify-center p-3 items-center gap-5"
            style={{ left: activeMenu ? '0%' : '-100%' }}>
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
        </div>
      )}
    </>
  );
};

export default Navbar;
