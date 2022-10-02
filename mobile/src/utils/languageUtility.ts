import { Language } from './../services/Languages';
export const combineRecentAndAllLanguages = (recentLanguages: Language[],languages:Language[]) => {
    const DATA = [
        {
            title: "RECENTS",
            data: recentLanguages || []
        },
         {
            title: "ALL",
            data: languages || []
         }
    ]



    return DATA
}