import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
	exercises: [],
	dayOfExercsises: null,
	editedDashboard: [],
};

const exerciseSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
		clearExercise: () => initialState,

		createExercise(state, { payload }) {
			state.exercises.push(payload.obj);
			state.dayOfExercsises = payload.day;
		},
		deleteExecise(state, { payload }) {
			const newEx = state.exercises.filter(el => el.id !== payload);
			state.exercises = newEx;
		},

		addApproach(state, { payload }) {
			const findedExercise = state.exercises.find(el => el.id === payload.id);
			if (findedExercise) {
				state.exercises.map((el, idx) => {
					if (el.id === payload.id) {
						state.exercises[idx].approaches.push(payload.obj);
					}
					return state;
				});
			}
		},
		dublicateExecise(state, { payload }) {
			const findedExercise = state.exercises.find(el => el.id === payload.id);
			if (findedExercise) {
				state.exercises.map((el, idx) => {
					if (el.id === payload.id) {
						state.exercises[idx].approaches.map((item, index) => {
							if (item.id === payload.approacheId) {
								state.exercises[idx].approaches.push({ ...item, id: uuidv4(), done: false });
							}
							return state;
						});
					}
					return state;
				});
			}
		},
		doneApproach(state, { payload }) {
			const findedExercise = state.exercises.find(el => el.id === payload.id);

			if (findedExercise) {
				state.exercises.map((el, idx) => {
					if (el.id === payload.id) {
						state.exercises[idx].approaches.map((item, index) => {
							if (item.id === payload.approacheId) {
								state.exercises[idx].approaches[index] = { ...item, done: !item.done };
							}
							return state;
						});
					}
					return state;
				});
			}
		},
		deleteApproach(state, { payload }) {
			const findedExercise = state.exercises.find(el => el.id === payload.id);
			if (findedExercise) {
				state.exercises.map((el, idx) => {
					if (el.id === payload.id) {
						const newState = state.exercises[idx].approaches.filter(item => item.id !== payload.approacheId);
						state.exercises[idx].approaches = newState;
					}
					return state;
				});
			}
		},
	
	},
});

export const { createExercise, deleteExecise, addApproach, doneApproach, deleteApproach, dublicateExecise, clearExercise } = exerciseSlice.actions;

export default exerciseSlice.reducer;
