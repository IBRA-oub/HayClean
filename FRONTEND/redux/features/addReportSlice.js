import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allReport } from "./allReportSlice";

const initialState = {
    report: null,
    loading: false,
    error: null
}

export const addReport = createAsyncThunk('auth/addReport', async (data, { rejectWithValue,dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/report`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });

        if(response){
            dispatch(allReport())
        }

        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const addReportSlice = createSlice({
    name: 'addReport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report = action.payload;
            })
            .addCase(addReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default addReportSlice.reducer;