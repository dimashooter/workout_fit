import React, { useState } from 'react';
import { VscDebugStart } from 'react-icons/vsc';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import { clearExercise, createExercise } from '../../redux/slice';
import { addToDashboard } from '../../redux/dashboardSlice';
import { useNavigate } from 'react-router-dom';
import { makeDate } from '../../utils/makeDate';

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const exercises = useSelector((store) => store.exerciseSlice.exercises);

  const addExercise = (e) => {
    e.stopPropagation();
    dispatch(
      createExercise({ obj: { id: uuidv4(), name: value, day: selectedDay, approaches: [] } }),
    );
    setIsOpen(false);
    setValue('');
    nav('/');
  };

  const handleDay = (e) => {
    setSelectedDay(e.target.value);
  };
  const deleteWorkout = () => {
    dispatch(clearExercise());
  };
  const saveWorkout = () => {
    let currentTime = makeDate();
    dispatch(addToDashboard({ exercises, currentTime }));
    dispatch(clearExercise());
    nav('/dashboard');

  };

  return (
    <div className="flex gap-5">
      <h2 className="font-bold text-4xl text-[#340075] mr-10">Workout</h2>
      <button
        className="text-[#f69ca5] bg-[#ffdde1] px-5 py-2 rounded-md disabled:opacity-75"
        onClick={deleteWorkout}
        disabled={!exercises.length}>
        Discard workout
      </button>
      <button
        className="text-white bg-[#340075] px-5 py-2 rounded-md disabled:opacity-25"
        onClick={saveWorkout}
        disabled={!exercises.length}>
        Save workout
      </button>
      <button
        className="text-white bg-[#340075] px-5 py-2 rounded-md"
        onClick={() => setIsOpen(true)}>
        Add exercise
      </button>
      <button className="text-white bg-[#340075] px-5 py-2 rounded-md">
        <VscDebugStart size={25} />
        {/* <BsStopCircle size={25} /> */}
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={addExercise} className="flex flex-col gap-3">
          <h3 className="font-semibold text-white text-2xl">Choose day of trainings</h3>
          <select name="days" onChange={handleDay}>
            <option disabled>Choose day of training</option>
            <option value="monday">M</option>
            <option value="Tuesday">Tu</option>
            <option value="Wednesday">W</option>
            <option value="Thursday">Th</option>
            <option value="Friday">Fr</option>
            <option value="Saturday">Sa</option>
            <option value="Sunday">S</option>
          </select>
          <h3 className="font-semibold text-white text-2xl">Add type of trainings</h3>
          <input
            className="outline-none p-4 rounded-md"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={addExercise} className="text-white bg-[#340075]  py-4 rounded-md">
            add exercise
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MainHeader;
