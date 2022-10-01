import { DataState } from './data/initialState';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { AppState } from "./app/initialState";
import App from "./app/slice";
import Data from "./data/slice"
import {setupListeners} from '@reduxjs/toolkit/query'

export interface TranslatorReduxState {
    App: AppState;
    Data: DataState
}

const reducers = combineReducers<TranslatorReduxState>({
    App,
    Data
})

const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

setupListeners(store.dispatch)


export default store