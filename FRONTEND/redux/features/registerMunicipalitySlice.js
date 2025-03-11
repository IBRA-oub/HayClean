import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const registerMunicipality = createAsyncThunk('auth/registerMunicipality', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/municipality/register`, data);
        const { accessToken } = response.data;
        if (accessToken) {
            await AsyncStorage.setItem('token', accessToken);
        }
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const registerMunicipalitySlice = createSlice({
    name: 'registerMunicipality',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerMunicipality.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerMunicipality.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(registerMunicipality.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default registerMunicipalitySlice.reducer;