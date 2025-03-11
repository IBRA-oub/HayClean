import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allReport } from "./allReportSlice";

const initialState = {
    toggleSad: null,
    loading: false,
    error: null
}

export const toggleSad = createAsyncThunk('reprot/toggleSad', async (id, { rejectWithValue, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/report/toggleSad/${id}`,
            {},
            {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response) {
            dispatch(allReport())
        }
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const toggleSadSlice = createSlice({
    name: 'toggleSad',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleSad.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleSad.fulfilled, (state, action) => {
                state.loading = false;
                state.toggleSad = action.payload;
            })
            .addCase(toggleSad.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default toggleSadSlice.reducer;