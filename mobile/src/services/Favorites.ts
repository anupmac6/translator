import API from "../api";
import { SearchItem } from "./History";
import { Language } from "./Languages";

export default class Favorites {
    static async get(){
        const response = await API.get<SearchItem[]>('/favorites')
        return response?.data
    }

    static async add(source:Language,target:Language,query:string,translation: string){
        const response = await API.post<{id:string}>('/favorites',{
            search:query,
            sourceLang: source?.code,
            targetLang: target?.code,
            translation
        })

        return response?.data
    }

    static async remove(favoriteId:string) {
        const response = await API.delete(`/favorites/${favoriteId}`)

        return response?.data
    }

    static async isFavorite(source:Language,target:Language,query:string,translation: string){
     
        const response = await API.post<boolean>('/favorites/isFavorite',{
            search:query,
            sourceLang: source?.code,
            targetLang: target?.code,
            translation
        })
        
        return response?.data
    }
}