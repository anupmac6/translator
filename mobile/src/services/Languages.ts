import { SettingsResponse } from './../api/index';
import API from "../api"
import Settings from './Settings';

export interface Language {
    createdAt?: number;
    code: string;
    name: string;
}

export interface LanguagesResponse {
languages: Language[]
}

export default class Languages {
    
    static async get () {
        const response =  await API.get<LanguagesResponse>('/translation/languages')

        return response?.data
    }
    static async getRecent () {
        const response = await API.get<Language[]>('/recent-languages')

        return response?.data
    }
    static async addRecent(language:Language) {
        const response = await API.post('/recent-languages',language)

        return response?.data
    }
    static async setSourceLanguage(language:Language) {
        const response = await Settings.setSourceLanguage(language)
            .then(() => Languages.addRecent(language))
            .then(() => true)
            .catch(() => false)

        return response
    }
    static async setTargetLanguage(language:Language) {
        const response = await Settings.setTargetLanguage(language)
            .then(() => Languages.addRecent(language))
            .then(() => true)
            .catch(() => false)

        return response
    }
    static async toggleLanguages(source:Language,target:Language) {
        const response = await Settings.setSourceLanguage(source)
            .then(() => Settings.setTargetLanguage(target))
            .then(() => true)
            .catch(() => false)
        return response
    }
}