import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allCollectionPoint } from "./allCollectionPointSlice";

const initialState = {
    collectionPoint: null,
    loading: false,
    error: null
}

export const editeCollectionPoint = createAsyncThunk('collectionPoint/editeCollectionPoint', async ({itemId,form}, { rejectWithValue,dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/collection-point/${itemId}`, form, {
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

const editeCollectionPointSlice = createSlice({
    name: 'editeCollectionPoint',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editeCollectionPoint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editeCollectionPoint.fulfilled, (state, action) => {
                state.loading = false;
                state.collectionPoint = action.payload;
            })
            .addCase(editeCollectionPoint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default editeCollectionPointSlice.reducer;