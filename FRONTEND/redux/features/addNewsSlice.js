import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allNews } from "./allNewsSlice";

const initialState = {
    News: null,
    loading: false,
    error: null
}

export const addNews = createAsyncThunk('report/addNews', async (data, { rejectWithValue,dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/news`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                 "Content-Type" : "multipart/form-data"
            }
        });

        if(response){
            dispatch(allNews())
        }

        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const addNewsSlice = createSlice({
    name: 'addNews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNews.fulfilled, (state, action) => {
                state.loading = false;
                state.News = action.payload;
            })
            .addCase(addNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default addNewsSlice.reducer;