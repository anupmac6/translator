import { Language,  } from "../../services/Languages";

export interface DataState {
    languages: Language[];
    recentLanguages: Language[];
}

const initialState: DataState = {
    languages: [],
    recentLanguages: []
}

export default initialState