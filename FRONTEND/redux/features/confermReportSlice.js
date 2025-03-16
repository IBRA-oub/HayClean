import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    payload: null,
    loading: false,
    error: null
}

export const conferm = createAsyncThunk('auth/conferm', async (id, { rejectWithValue }) => {
    try {

        const token = await AsyncStorage.getItem('token')
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/report/completed/${id}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const confermSlice = createSlice({
    name: 'conferm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(conferm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(conferm.fulfilled, (state, action) => {
                state.loading = false;
                state.payload = action.payload;
            })
            .addCase(conferm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default confermSlice.reducer;