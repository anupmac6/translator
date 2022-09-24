import { createSlice } from "@reduxjs/toolkit";
import { TranslatorReduxState } from "..";
import initialState from "./initialState";

export const AppSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        setShowOnboarding: (state,action) => {
            state.showOnboarding = action.payload
        }
    }
})

export const {
    setShowOnboarding
} = AppSlice.actions

export const getShowOnboarding = (state:TranslatorReduxState) => state.App.showOnboarding

export default AppSlice.reducer