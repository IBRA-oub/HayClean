import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allEvents } from "./allEventsSlice";

const initialState = {
    Event: null,
    loading: false,
    error: null
}

export const addEvent = createAsyncThunk('report/addEvent', async (data, { rejectWithValue,dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/event`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                 "Content-Type" : "multipart/form-data"
            }
        });

        if(response){
            dispatch(allEvents())
        }

        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const addEventSlice = createSlice({
    name: 'addEvent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.Event = action.payload;
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default addEventSlice.reducer;