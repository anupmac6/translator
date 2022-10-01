import { SettingsResponse } from './../api/index';
import API from "../api"

export interface Language {
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
}