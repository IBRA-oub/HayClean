import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allCollectionPoint } from "./allCollectionPointSlice";

const initialState = {
    collectionPoint: null,
    loading: false,
    error: null
}

export const deleteCollectionPoint = createAsyncThunk('collectionPoint/deleteCollectionPoint', async (id, { rejectWithValue,dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/collection-point/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(response){
            dispatch(allCollectionPoint())
        }

        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const deleteCollectionPointSlice = createSlice({
    name: 'deleteCollectionPoint',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCollectionPoint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCollectionPoint.fulfilled, (state, action) => {
                state.loading = false;
                state.collectionPoint = action.payload;
            })
            .addCase(deleteCollectionPoint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default deleteCollectionPointSlice.reducer;