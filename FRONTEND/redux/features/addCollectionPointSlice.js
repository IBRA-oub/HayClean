import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { allCollectionPoint } from "./allCollectionPointSlice";

const initialState = {
    collectionPoint: null,
    loading: false,
    error: null
}

export const addCollectionPoint = createAsyncThunk('collectionPoint/addCollectionPoint', async (data, { rejectWithValue,dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/collection-point`, data, {
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

const addCollectionPointSlice = createSlice({
    name: 'addCollectionPoint',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCollectionPoint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCollectionPoint.fulfilled, (state, action) => {
                state.loading = false;
                state.collectionPoint = action.payload;
            })
            .addCase(addCollectionPoint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default addCollectionPointSlice.reducer;