import API from "../api";
import { Language } from "./Languages";
export interface DefinitionsGroup {
    type: string,
    list: {
        definition: string,
        example: string,
        field?: string,
        synonyms: string[]
    }[]
}

export interface ExtraTranslationsGroup {
    type: string,
    list: {
        word: string,
        article?: string,
        frequency: number,
        meanings: string[]
    }[]
}

export interface TranslationInfo {
    detectedSource?: string,
    typo?: string,
    pronunciation: {
        query?: string,
        translation?: string
    },
    definitions: DefinitionsGroup[],
    examples: string[],
    similar: string[],
    extraTranslations: ExtraTranslationsGroup[]
}

export interface Translation {
    translation: string,
    info?: TranslationInfo

}

export default class Translate {

    static async text (source:Language, target: Language, query: string) {
        const response = await API.post<Translation>('/translation/translate', {
            source:source.code,
            target: target.code,
            query
        })
        return response?.data
    }
}