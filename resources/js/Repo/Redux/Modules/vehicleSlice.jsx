import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    vehicles: [],
    currentVehicle: null,
    loading: false,
    error: null
};

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setVehicles: (state, action) => {
            // API response: dizi olarak geliyor
            state.vehicles = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addVehicle: (state, action) => {
            state.vehicles.push(action.payload);
        },
        updateVehicle: (state, action) => {
            const index = state.vehicles.findIndex(vehicle => vehicle.id === action.payload.id);
            if (index !== -1) {
                state.vehicles[index] = action.payload;
            }
        },
        setCurrentVehicle: (state, action) => {
            state.currentVehicle = action.payload;
        }
    }
});

export const {
    setVehicles,
    setError,
    setLoading,
    addVehicle,
    updateVehicle,
    setCurrentVehicle
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
