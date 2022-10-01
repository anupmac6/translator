import { TranslatorReduxState } from '..';
import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";


export const DataSlice = createSlice({
    name: 'Data',
    initialState,
    reducers: {
        setLanguages: (state,action) => {
            state.languages = action.payload
        }
    }
})

export const {
    setLanguages
} = DataSlice.actions

export const getLanguages = (state:TranslatorReduxState) => state.Data.languages

export default DataSlice.reducer