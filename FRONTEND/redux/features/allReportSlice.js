import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allReport: null,
    loading: false,
    error: null
}

export const allReport = createAsyncThunk('report/allReport', async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/report/pendingReport`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)

    }
})

const allReportSlice = createSlice({
    name: 'allReport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allReport.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(allReport.fulfilled, (state, action) => {
                state.loading = true;
                state.allReport = action.payload

            })
            .addCase(allReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default allReportSlice.reducer;