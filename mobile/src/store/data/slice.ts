import { TranslatorReduxState } from '..';
import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";


export const DataSlice = createSlice({
    name: 'Data',
    initialState,
    reducers: {
        setLanguages: (state,action) => {
            state.languages = action.payload
        },
        setRecentLanguages: (state,action) => {
            state.recentLanguages = action.payload
        }
    }
})

export const {
    setLanguages,
    setRecentLanguages
} = DataSlice.actions

export const getLanguages = (state:TranslatorReduxState) => state.Data.languages
export const getRecentLanguages = (state:TranslatorReduxState) => state.Data.recentLanguages

export default DataSlice.reducer