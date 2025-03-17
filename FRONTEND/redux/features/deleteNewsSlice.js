import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allNews } from "./allNewsSlice";


const initialState = {
    News: null,
    loading: false,
    error: null
}

export const deleteNews = createAsyncThunk('Event/deleteNews', async (itemId, { rejectWithValue, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/news/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response) {
            dispatch(allNews())
        }

        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const deleteNewsSlice = createSlice({
    name: 'deleteNews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.loading = false;
                state.News = action.payload;
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default deleteNewsSlice.reducer;