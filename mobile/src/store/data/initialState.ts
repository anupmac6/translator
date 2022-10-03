import { SearchItem } from "../../services/History";
import { Language,  } from "../../services/Languages";

export interface DataState {
    languages: Language[];
    recentLanguages: Language[];
    favorites: SearchItem[];
    localFavorites: SearchItem[]
}

const initialState: DataState = {
    languages: [],
    recentLanguages: [],
    favorites: [],
    localFavorites: []
}

export default initialState