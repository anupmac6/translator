export interface AppState {
    showOnboarding: boolean;
    isLoggedIn: boolean;
    isAddSheetOpen: boolean;
}

const initialState:AppState = {
    showOnboarding: true,
    isLoggedIn: true,
    isAddSheetOpen: false
}

export default initialState