import { required, maxLength, range, } from '@rx/annotations';
import { vLanguage, vModuleMaster, vDbOperationType, vApplicationModule, vLanguageContentType, vRecordStatus, vLanguageContentName } from "app/database-models";
export class ModuleContentMultilingualLookupGroup {
    activeLanguages: vLanguage[];
    applicationModules: vApplicationModule[];
    languageContentTypes: vLanguageContentType[]
    dbOperationTypes: vDbOperationType[];
    recordStatuses: vRecordStatus[];
    languageContentNames: vLanguageContentName[];
}

export class ModuleContentViewModel {
    constructor(moduleContent?: ModuleContentViewModel) {
        if (moduleContent) {
            this.moduleContentId = moduleContent.moduleContentId;
            this.languageContentName = moduleContent.languageContentName;
            this.baseText = moduleContent.baseText;
            this.moduleText = moduleContent.moduleText;
            this.english = moduleContent.english;
            this.languageContentId = moduleContent.languageContentId;
        }
    }
    moduleContentId: number;

    languageContentName: string;

    baseText: string;

    moduleText: string;

    english: string;

    languageContentId: string;
}

export class ModuleContentModel {
    @required()
    applicationModuleId: number = 0;
    @required()
    languageContentType: string = "";
    @required()
    operationType: string = "";
    @required()
    languageName: string = "";
    languageContentId: number = 0;
    value: string;
    englishText: string = "";
    moduleContentId: number = 0;
}




export class ModuleContentSearchViewModel {
    constructor(moduleContentSearchViewModel?: ModuleContentSearchViewModel) {
        let properties = ["applicationModuleId", "languageContentType", "operationType", "languageName"];
        for (let property of properties)
            if (moduleContentSearchViewModel && moduleContentSearchViewModel[property])
                this[property] = moduleContentSearchViewModel[property];
    }
    @required()
    applicationModuleId: number = undefined

    @required()
    languageContentType: string = undefined;

    @required()
    operationType: string = undefined;

    @required()
    languageName: string = undefined;

    languageId: number = undefined;
}
