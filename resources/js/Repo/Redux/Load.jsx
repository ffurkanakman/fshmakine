import servisReducer from './Modules/ServisSlice';
import servisSlice from "./Modules/ServisSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        servis: servisSlice,
        // diğer slice'lar
    }
});
