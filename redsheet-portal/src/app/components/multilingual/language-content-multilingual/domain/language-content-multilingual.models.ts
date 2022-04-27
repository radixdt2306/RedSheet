
import { vLanguage } from "app/database-models";

export class LanguageContentMultilinguallookupGroup {
    activeLanguages: vLanguage[];
}

export class LanguageContentViewModel {
    languageContentId: number;
    languageContentName: string;
    english: string;
    multilingual: string;
}

export class LanguageContentSearchViewModel {
    constructor(languageWiseSearchViewModel?: LanguageContentSearchViewModel) {
        let properties = ["languageId"];
        for (let property of properties)
            if (languageWiseSearchViewModel && languageWiseSearchViewModel[property])
                this[property] = languageWiseSearchViewModel[property];
    }
    languageId: number = undefined
}