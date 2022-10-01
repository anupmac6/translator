import { SettingsResponse } from './../api/index';
import API from "../api"

export default class Settings {
    
    static async get () {
        const response =  await API.get<SettingsResponse>('/settings')

        return response?.data
    }
}