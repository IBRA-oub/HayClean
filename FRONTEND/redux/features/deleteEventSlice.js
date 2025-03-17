import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allEvents } from "./allEventsSlice";


const initialState = {
    Event: null,
    loading: false,
    error: null
}

export const deleteEvent = createAsyncThunk('Event/deleteEvent', async (itemId, { rejectWithValue, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/event/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response) {
            dispatch(allEvents())
        }

        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const deleteEventSlice = createSlice({
    name: 'deleteEvent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.Event = action.payload;
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default deleteEventSlice.reducer;