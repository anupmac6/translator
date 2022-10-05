import API from "../api";
import { Language } from "./Languages";
import {SearchItem} from './History'
export interface Category {
    id: string;
    name: string;
    itemCount: number;
    createdAt: number;
}
export default class Categories {
    static async get() {
        const response = await API.get<Category[]>('/categories')
        return response?.data
    }

    static async add(name:string) {
        const response = await API.post('/categories',{
            name
        })

        return response?.data
    }

    static async addToCategory(categoryId:string,source:Language,target:Language,query:string,translation:string) {
        const response = await API.post('/categories/translations', {
            categoryId,
            search:query.trim(),
            sourceLang: source?.code,
            targetLang: target?.code,
            translation: translation.trim()
        })

        return response?.data
    }

    static async isInCategory(source:Language,target:Language,query:string,translation:string) {
        const response = await API.post<{categoryId:string,categoryItemId:string}[]>('/categories/isInCategory', {
            search:query.trim(),
            sourceLang: source?.code,
            targetLang: target?.code,
            translation: translation.trim()
        })
        console.log(response?.data)
        return response?.data
    }

    static async getById(categoryId:string) {
        const response = await API.get<SearchItem[]>(`/categories/${categoryId}`)
        return response?.data
    }

    static async remove(categoryId:string) {
        const response = await API.delete(`/categories/${categoryId}`)

        return response?.data
    }

    static async removeItem(categoryId:string,itemId:string) {
        const response = await API.delete(`/categories/${categoryId}/${itemId}`)

        return response?.data
    }
}