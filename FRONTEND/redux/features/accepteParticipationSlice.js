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

export const accepteParticipation = createAsyncThunk('event/accepteParticipation', async ({ id, email }, { rejectWithValue, dispatch }) => {
    try {
        const data = {
            email: email
        }
        const token = await AsyncStorage.getItem('token')
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/event/accepteParticipant/${id}`, data, {
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

const accepteParticipationSlice = createSlice({
    name: 'accepteParticipation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(accepteParticipation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(accepteParticipation.fulfilled, (state, action) => {
                state.loading = false;
                state.payload = action.payload.payload;
            })
            .addCase(accepteParticipation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default accepteParticipationSlice.reducer;