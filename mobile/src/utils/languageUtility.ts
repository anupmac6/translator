import { Language } from './../services/Languages';
export const combineRecentAndAllLanguages = (recentLanguages: Language[],languages:Language[],search:string | undefined) => {
    
    if(search){
        return [
            {
                title: "",
                data: languages?.filter(language => language.name?.toLowerCase().includes(search?.toLowerCase()))
            }
        ]
    }
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