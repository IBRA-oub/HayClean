import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allEvents } from "./allEventsSlice";

const initialState = {
    Event: null,
    loading: false,
    error: null
}

export const editeEvent = createAsyncThunk('event/editeEvent', async ({itemId,formData}, { rejectWithValue,dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/event/${itemId}`, formData, {
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

const editeEventSlice = createSlice({
    name: 'editeEvent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editeEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editeEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.collectionPoint = action.payload;
            })
            .addCase(editeEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default editeEventSlice.reducer;