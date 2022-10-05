import { Language } from './../../services/Languages';
export interface AppState {
    showOnboarding: boolean;
    isLoggedIn: boolean;
    isAddSheetOpen: boolean;
    sourceLang: string;
    targetLang: string;
    addToCategory: {
        source:Language,
        target:Language,
        query: string,
        translation:string
    } | null
}

const initialState:AppState = {
    showOnboarding: true,
    isLoggedIn: true,
    isAddSheetOpen: false,
    sourceLang: 'en',
    targetLang: 'es',
    addToCategory: null
}

export default initialState