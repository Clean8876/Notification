import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectIds: [],  // Initially, no project is selected
};

const projectIdSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId: (state, action) => {
        state.projectIds.push(action.payload);
    },
    clearProjectId: (state) => {
      state.projectIds = null;
    },
  },
});

export const { setProjectId, clearProjectId } = projectIdSlice.actions;
export default projectIdSlice.reducer;