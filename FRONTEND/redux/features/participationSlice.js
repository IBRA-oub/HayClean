import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { ParticipantCitizen } from "./participantCitizenSlice";

const initialState = {
    payload: null,
    loading: false,
    error: null
}

export const participation = createAsyncThunk('auth/participation', async (id, { rejectWithValue, dispatch }) => {
    try {

        const token = await AsyncStorage.getItem('token')
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/event/participation/${id}`, {}, {
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

const participationSlice = createSlice({
    name: 'participation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(participation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(participation.fulfilled, (state, action) => {
                state.loading = false;
                state.payload = action.payload.payload;
            })
            .addCase(participation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default participationSlice.reducer;