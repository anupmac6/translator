import { SearchItem } from './../../services/History';
import { Language } from './../../services/Languages';
import { TranslatorReduxState } from '..';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        },
        setFavorites: (state,action) => {
            state.favorites = action.payload
        },
        setLocalFavorites: (state,action) => {
            state.localFavorites = action.payload
        },
        addLocalFavorite: (state,action:PayloadAction<{id?:string,translation:string,source:Language,target:Language,query:string}>) => {
            const {id, query ,source,translation,target} = action.payload
            const data: SearchItem = {
                search: query,
                sourceLang: source.code,
                targetLang: target.code,
                translation:translation,
                id: id || state.localFavorites.length.toString()
            }
            state.localFavorites.push(data)
        }
    }
})

export const {
    setLanguages,
    setRecentLanguages,
    setFavorites,
    setLocalFavorites,
    addLocalFavorite
} = DataSlice.actions

export const getLanguages = (state:TranslatorReduxState) => state.Data.languages
export const getRecentLanguages = (state:TranslatorReduxState) => state.Data.recentLanguages
export const getFavorites = (state:TranslatorReduxState) => state.Data.favorites
export const getLocalFavorites = (state:TranslatorReduxState) => state.Data.localFavorites

export default DataSlice.reducer