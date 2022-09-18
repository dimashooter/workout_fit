import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dashboard: [],
	editedDashboard: [],
};

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		clearDashboard: () => initialState,
		addToDashboard(state, { payload }) {
			if (payload.exercises) {
				payload.exercises.map(item => {
					return state.dashboard.push({ ...item, date: payload.currentTime });
				});
			}
		},
		fetchDashboard(state, { payload }) {
			let tmp = JSON.parse(payload);

			if (tmp.dashboard) {
				tmp.dashboard.map(item => {
					return state.dashboard.push({ ...item });
				});
			}
		},
		editFilteredDashboard(state, { payload }) {
			const foundDashboard = state.dashboard.find(el => payload.id === el.id);
			if (foundDashboard) {
				foundDashboard.name = payload.name;
				foundDashboard.approaches = payload.approaches;
			}
		},
		deleteFilteredDashboard(state, { payload }) {
			const filteredDashboard = state.dashboard.filter(el => el.id !== payload);
			state.dashboard = filteredDashboard;
		},
		editedDashboard(state, { payload }) {
			state.editedDashboard = payload;
		},
	},
});

export const { addToDashboard, fetchDashboard, clearDashboard, editFilteredDashboard, deleteFilteredDashboard, editedDashboard } =
	dashboardSlice.actions;

export default dashboardSlice.reducer;
