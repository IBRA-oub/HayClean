import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    report: null,
    loading: false,
    error: null
}

export const getReportById = createAsyncThunk('report/getReportById', async (id, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/report/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)

    }
})

const getReportByIdSlice = createSlice({
    name: 'getReportById',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReportById.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getReportById.fulfilled, (state, action) => {
                state.loading = true;
                state.report = action.payload

            })
            .addCase(getReportById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default getReportByIdSlice.reducer;