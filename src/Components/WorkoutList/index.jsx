import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExecise } from '../../redux/slice';
import WorkoutItem from '../WorkoutItem';

const WorkoutList = () => {
  const exercises = useSelector((state) => state.exerciseSlice.exercises);
  const dispatch = useDispatch();
  const deleteExerciseHandle = (id) => {
    dispatch(deleteExecise(id));
  };
  return (
    <>
      {exercises?.map((el) => {
        return <WorkoutItem deleteItem={deleteExerciseHandle} item={el} key={el.id} />;
      })}
    </>
  );
};

export default WorkoutList;
