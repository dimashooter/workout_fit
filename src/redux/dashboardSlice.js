import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dashboard: [],
  saveTime: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboard: () => initialState,
    addToDashboard(state, { payload }) {
      if (payload.exercises) {
        payload.exercises.map((item) => {
          return state.dashboard.push({ ...item, date: payload.currentTime });
        });
      }
    },
    fetchDashboard(state, { payload }) {
      let tmp = JSON.parse(payload);
      if (tmp.dashboard) {
        tmp.dashboard.map((item) => {
          return state.dashboard.push({ ...item, date: tmp.currentTime });
        });
      }
    },
  },
});

export const { addToDashboard, fetchDashboard, clearDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
