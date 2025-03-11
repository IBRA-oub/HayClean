import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    payload: null,
    loading: false,
    error: null
}

export const mailVerificationMunicipality = createAsyncThunk('auth/mailVerificationMunicipality', async (data, { rejectWithValue }) => {
    try {
        const accessToken = await AsyncStorage.getItem('token')
        const verefyCode = {
            code: data
        }
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/municipality/verifyEmail`, verefyCode, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": 'application/json'
            }
        });
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const mailVerificationMunicipalitySlice = createSlice({
    name: 'mailVerificationMunicipality',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(mailVerificationMunicipality.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mailVerificationMunicipality.fulfilled, (state, action) => {
                state.loading = false;
                state.payload = action.payload.payload;
            })
            .addCase(mailVerificationMunicipality.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default mailVerificationMunicipalitySlice.reducer;