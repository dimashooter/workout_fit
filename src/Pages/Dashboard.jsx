import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDashboard, editFilteredDashboard } from '../redux/dashboardSlice';
import { camelCase } from '../utils/camelCase';
import { CgGym } from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import Modal from '../Components/modal';
import { Controller, useForm } from 'react-hook-form';

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const state = useSelector((store) => store.dashboardSlice);
  const dispatch = useDispatch();
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [activeDay, setActiveDay] = useState('Monday');
  const [editCurrentItem, setEditCurrentItem] = useState(false);
  const [item, setItem] = useState([]);

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
  const openModal = (currentItem) => {
    setItem(currentItem);
    setEditCurrentItem(true);
  };

  const formSubmit = (data) => {
    const approaches = item.approaches.map((el, idx) => {
      return {
        id: el.id,
        kg: data[`count-${idx}`],
        count: data[`kg-${idx}`],
        done: false,
      };
    });

    const obj = {
      id: item.id,
      name: data.name,
      approaches: approaches,
    };
    dispatch(editFilteredDashboard(obj));
    setEditCurrentItem(false);
    console.log(data);
  };
  return (
    <>
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
              <div className="flex gap-3">
                <span className="text-2xl font-bold text-[#340075]">{camelCase(item.name)}</span>
                <MdEdit
                  color="#340075"
                  size={30}
                  onClick={() => openModal(item)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
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
        {filteredDashboard.length === 0 && (
          <h3 className="flex gap-3 items-center pt-5">
            Упс... Самое время задать тренировку на данный день
            <span>
              <CgGym size={30} />
            </span>
          </h3>
        )}
      </div>
      {filteredDashboard.length > 0 && (
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
      )}
      <Modal open={editCurrentItem} onClose={() => setEditCurrentItem(false)}>
        <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-5">
          <label htmlFor="">
            <input
              className="p-2"
              type="text"
              defaultValue={item.name}
              placeholder="Change name"
              {...register('name')}
            />
          </label>
          {item.approaches?.map((el, idx) => {
            return (
              <>
                <Controller
                  control={control}
                  name={`count-${idx}`}
                  defaultValue={el.count}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex gap-5">
                      <span className="w-[50px]">{value}</span>
                      <input
                        name={`count-${idx}`}
                        type="range"
                        min={0}
                        max={200}
                        defaultValue={el.count}
                        {...register(`kg`)}
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name={`kg-${idx}`}
                  defaultValue={el.kg}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex gap-5">
                      <span className="w-[50px]">{value}</span>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        defaultValue={el.kg}
                        {...register(`count`)}
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  )}
                />
              </>
            );
          })}
          <input type="submit" value="edit" />
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;
