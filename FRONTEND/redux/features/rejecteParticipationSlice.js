import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { ParticipantCitizen } from "./participantCitizenSlice";
import { participantMunicipality } from "./participantMunicipalitySlice";

const initialState = {
    payload: null,
    loading: false,
    error: null
}

export const rejecteParticipation = createAsyncThunk('event/rejecteParticipation', async ({ id, email }, { rejectWithValue, dispatch }) => {
    try {

        const data = {
            email: email
        }
        const token = await AsyncStorage.getItem('token')
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/event/rajecteParticipant/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response) {
            dispatch(participantMunicipality())
        }
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const rejecteParticipationSlice = createSlice({
    name: 'rejecteParticipation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rejecteParticipation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejecteParticipation.fulfilled, (state, action) => {
                state.loading = false;
                state.payload = action.payload.payload;
            })
            .addCase(rejecteParticipation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default rejecteParticipationSlice.reducer;