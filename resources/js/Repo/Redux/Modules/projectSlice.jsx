import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [],
    loading: false,
    error: null
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload.data;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
        }
    }
});

export const {
    setProjects,
    setError,
    setLoading,
    addProject } = projectSlice.actions;
export default projectSlice.reducer;
