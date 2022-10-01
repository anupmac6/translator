import { createSlice } from "@reduxjs/toolkit";
import { TranslatorReduxState } from "..";
import initialState from "./initialState";

export const AppSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        setShowOnboarding: (state,action) => {
            state.showOnboarding = action.payload
        },
        setIsLoggedIn: (state,action) => {
            state.isLoggedIn = action.payload
        },
        setIsAddSheetOpen: (state,action) => {
            state.isAddSheetOpen = action.payload
        },
        setSourceLanguage: (state,action) => {
            state.sourceLang = action.payload
        },
        setTargetLanguage: (state,action) => {
            state.targetLang = action.payload
        }
    }
})

export const {
    setShowOnboarding,
    setIsAddSheetOpen,
    setIsLoggedIn,
    setSourceLanguage,
    setTargetLanguage
} = AppSlice.actions

export const getShowOnboarding = (state:TranslatorReduxState) => state.App.showOnboarding
export const getIsLoggedIn = (state:TranslatorReduxState) => state.App.isLoggedIn
export const getIsAddSheetOpen = (state:TranslatorReduxState) => state.App.isAddSheetOpen
export const getSourceLanguage = (state:TranslatorReduxState) => state.App.sourceLang
export const getTargetLanguage = (state:TranslatorReduxState) => state.App.targetLang

export default AppSlice.reducer