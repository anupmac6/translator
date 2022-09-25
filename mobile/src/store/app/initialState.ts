export interface AppState {
    showOnboarding: boolean;
    isLoggedIn: boolean;
}

const initialState:AppState = {
    showOnboarding: true,
    isLoggedIn: true

}

export default initialState