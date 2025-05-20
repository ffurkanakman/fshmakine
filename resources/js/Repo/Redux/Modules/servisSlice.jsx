import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    servisler: [],
    loading: false,
    error: null

};

const servisSlice = createSlice({
    name: 'servis',
    initialState,
    reducers: {
        setservisler: (state, action) => {
            state.servisler = action.payload.data;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }

    }

});


export const {
    setservisler,
    setError,
    setLoading } = servisSlice.actions;
export default servisSlice.reducer;

