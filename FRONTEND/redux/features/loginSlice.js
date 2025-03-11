import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const role = await AsyncStorage.getItem('role')
        let response;
        if (role === 'Citizen') {
            response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/citizen/login`, data);
        } else if (role === 'Municipality') {
            response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/municipality/login`, data);
        }
        const { accessToken } = response.data;
        if (accessToken) {
            await AsyncStorage.setItem('token', accessToken);
        }
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default loginSlice.reducer;