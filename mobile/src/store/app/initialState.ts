export interface AppState {
    showOnboarding: boolean;
    isLoggedIn: boolean;
    isAddSheetOpen: boolean;
    sourceLang: string;
    targetLang: string;
}

const initialState:AppState = {
    showOnboarding: true,
    isLoggedIn: true,
    isAddSheetOpen: false,
    sourceLang: 'en',
    targetLang: 'es'
}

export default initialState