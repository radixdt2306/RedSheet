import { vLanguage,vApplicationTimeZone } from "app/database-models";


export class GlobalSettingsLookupGroup {
    languages: vLanguage[];
    applicationTimeZones : vApplicationTimeZone[]
}
