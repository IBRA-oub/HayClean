import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { ParticipantCitizen } from "./participantCitizenSlice";

const initialState = {
    payload: null,
    loading: false,
    error: null
}

export const cancelParticipation = createAsyncThunk('auth/cancelParticipation', async (id, { rejectWithValue, dispatch }) => {
    try {

        const token = await AsyncStorage.getItem('token')
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/event/cancelParticipation/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response) {
            dispatch(ParticipantCitizen())
        }
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const cancelParticipationSlice = createSlice({
    name: 'cancelParticipation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(cancelParticipation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelParticipation.fulfilled, (state, action) => {
                state.loading = false;
                state.payload = action.payload.payload;
            })
            .addCase(cancelParticipation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default cancelParticipationSlice.reducer;