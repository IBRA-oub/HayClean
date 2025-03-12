import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allEvents: null,
    loading: false,
    error: null
}

export const allEvents = createAsyncThunk('all/allEvents', async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/event`, {
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

const allEventsSlice = createSlice({
    name: 'allEvents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allEvents.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(allEvents.fulfilled, (state, action) => {
                state.loading = true;
                state.allEvents = action.payload

            })
            .addCase(allEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default allEventsSlice.reducer;