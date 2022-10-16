import axios from 'axios'

export interface SettingsResponse {
    showOnboarding: boolean;
    sourceLang: string;
    targetLang: string;
}

const API = axios.create({
    baseURL: 'http://192.168.68.87:8080',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
    }
})


// API.interceptors.response.use(response => response.data, err => Promise.reject(err))

export default API