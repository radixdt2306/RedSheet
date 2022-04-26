export class Language {
    constructor(language?: Language) {
        if (language) {
            this.languageId = language.languageId;
            this.languageName = language.languageName;
            this.languageCode = language.languageCode;
            this.active = language.active;
        }
    }
    languageId: number;
    languageName: string;
    languageCode: string;
    active: boolean
}