import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useClickOutside from '../hooks/useClickOutside';
import { clearDashboard } from '../redux/dashboardSlice';
import { camelCase } from '../utils/camelCase';

const buttons = [
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
  { id: 7, name: 'Sunday' },
];

const Dashboard = () => {
  const state = useSelector((store) => store.dashboardSlice);
  const dispatch = useDispatch();
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [activeDay, setActiveDay] = useState('Monday');
  const deleteDashboard = () => {
    dispatch(clearDashboard());
    localStorage.removeItem('item');
  };
  const saveDashboard = () => {
    localStorage.setItem(
      'item',
      JSON.stringify({ dashboard: state.dashboard, saveTime: state.saveTime }),
    );
  };

  const handleDay = (e) => {
    if (e.target.value) {
      setActiveDay(e.target.value);
    }
  };

  const filteredDashboard = state.dashboard.filter((el) => el.day === activeDay);
  return (
    <div>
      <div
        className="flex gap-2 w-full md:justify-between sm:justify-start mb-2 flex-wrap"
        onClick={handleDay}>
        {buttons.map((btn) => {
          const styles =
            activeMenuItem === btn.id
              ? {
                  background: '#340075',
                  color: '#ffffff',
                }
              : {
                  background: '#ffffff',
                  color: '#340075',
                };

          return (
            <button
              style={{ ...styles, padding: '10px 20px', borderRadius: '8px' }}
              key={btn.id}
              value={btn.name}
              onClick={() => setActiveMenuItem(btn.id)}>
              {btn.name}
            </button>
          );
        })}
      </div>
      {filteredDashboard.map((item) => {
        return (
          <div key={item.id}>
            <span className="text-2xl font-bold text-[#340075]">{camelCase(item.name)}</span>
            <div>{item.date}</div>
            <div className="">
              <div className="flex gap-5">
                <span>Weight</span>
                <span>Count</span>
              </div>
              {item.approaches.map((el) => (
                <div key={el.id} className="flex gap-5 p-2">
                  <span
                    className="min-w-[50px] bg-slate-400 p-2 text-white rounded-sm
                  text-center">
                    {el.kg}
                  </span>
                  <span
                    className="min-w-[50px] bg-slate-400 p-2 text-white rounded-sm
                  text-center">
                    {el.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <span>{state.saveTime}</span>
      {filteredDashboard.length > 0 ? (
        <div className="flex gap-10 mt-3">
          <button
            className="px-4 py-2 bg-[#340075] text-white rounded-md"
            onClick={deleteDashboard}>
            delete dashboard
          </button>
          <button
            className="px-4 py-2 bg-[#340075] text-white rounded-md active:bg-[#ffffff] active:text-[#340075]"
            onClick={saveDashboard}>
            save dashboard
          </button>
        </div>
      ) : (
        <h3>Упс... Самое время задать тренировку на данный день :)</h3>
      )}
    </div>
  );
};

export default Dashboard;
