import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allParticipant: null,
    loading: false,
    error: null
}

export const ParticipantCitizen = createAsyncThunk('all/ParticipantCitizen', async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/event/ParticipantCitizen`, {
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

const ParticipantCitizenSlice = createSlice({
    name: 'ParticipantCitizen',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ParticipantCitizen.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(ParticipantCitizen.fulfilled, (state, action) => {
                state.loading = true;
                state.allParticipant = action.payload

            })
            .addCase(ParticipantCitizen.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default ParticipantCitizenSlice.reducer;