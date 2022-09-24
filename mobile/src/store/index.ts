import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { AppState } from "./app/initialState";
import App from "./app/slice";
import {setupListeners} from '@reduxjs/toolkit/query'

export interface TranslatorReduxState {
    App: AppState
}

const reducers = combineReducers<TranslatorReduxState>({
    App
})

const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

setupListeners(store.dispatch)


export default store