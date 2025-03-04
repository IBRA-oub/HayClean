import { configureStore } from "@reduxjs/toolkit";
import citySlice from "../features/citySlice";
export const store = configureStore({
    reducer: {
        cities: citySlice,
    }
}) 