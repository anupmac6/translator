import API from "../api";
import { Language } from "./Languages";

export interface HistoryItem {
    id: string;
    name: string;
    itemCount: number;
    createdAt: number;
}

export interface SearchItem {
    id: string;
    sourceLang: string;
    targetLang: string;
    translation: string;
    search: string;
    createdAt?: number
}
export default class History {

    static async get() {
        const response = await API.get<HistoryItem[]>('/history')
        return response?.data
    }

    static async getById(historyId:string) {
        const response = await API.get<SearchItem[]>(`/history/${historyId}`)
        return response?.data
    }


    static async add(source:Language,target:Language,query:string,translation:string) {
        const response = await API.post<{id:string}>('/history', {
            search:query,
            sourceCode: source?.code,
            sourceName: source?.name,
            targetCode: target?.code,
            targetName: target?.name,
            translation: translation
        })

        await this.addToRecentSearches(source,target,query,translation)

        return response?.data
    }

    static async addToRecentSearches(source:Language,target:Language,query:string,translation:string) {
        const response = await API.post('/recents', {
            search: query,
            sourceLang: source?.code,
            targetLang: target?.code,
            translation: translation
        })

        return response?.data
    }

    static async getRecentSearches() {
        const response = await API.get<SearchItem>('/recents')
        return response?.data
    }


}