import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allParticipant: null,
    loading: false,
    error: null
}

export const participantMunicipality = createAsyncThunk('all/participantMunicipality', async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/event/pendingParticipant`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)

    }
})

const participantMunicipalitySlice = createSlice({
    name: 'participantMunicipality',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(participantMunicipality.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(participantMunicipality.fulfilled, (state, action) => {
                state.loading = true;
                state.allParticipant = action.payload

            })
            .addCase(participantMunicipality.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default participantMunicipalitySlice.reducer;