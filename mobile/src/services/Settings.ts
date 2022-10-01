import { SettingsResponse } from './../api/index';
import API from "../api"
import { Language } from './Languages';

export default class Settings {
    
    static async get () {
        const response =  await API.get<SettingsResponse>('/settings')

        return response?.data
    }

    static async setSourceLanguage(language:Language) {
        const response = await API.post('/settings',{sourceLang: language.code})
        return response?.data
    }

    static async setTargetLanguage(language:Language) {
        const response = await API.post('/settings',{targetLang: language.code})
        return response?.data
    }
}