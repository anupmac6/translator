import { Language } from "../../services/Languages";

export interface DataState {
    languages: Language[]
}

const initialState: DataState = {
    languages: []
}

export default initialState