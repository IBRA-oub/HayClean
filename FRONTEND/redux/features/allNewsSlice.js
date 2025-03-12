import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allNews: null,
    loading: false,
    error: null
}

export const allNews = createAsyncThunk('all/allNews', async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/news`, {
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

const allNewsSlice = createSlice({
    name: 'allNews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allNews.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(allNews.fulfilled, (state, action) => {
                state.loading = true;
                state.allNews = action.payload

            })
            .addCase(allNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default allNewsSlice.reducer;