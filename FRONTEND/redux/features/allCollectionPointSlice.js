import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allCollectionPoint: null,
    loading: false,
    error: null
}

export const allCollectionPoint = createAsyncThunk('all/allCollectionPoint', async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/collection-point`, {
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

const allCollectionPointSlice = createSlice({
    name: 'allCollectionPoint',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allCollectionPoint.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(allCollectionPoint.fulfilled, (state, action) => {
                state.loading = true;
                state.allCollectionPoint = action.payload

            })
            .addCase(allCollectionPoint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default allCollectionPointSlice.reducer;