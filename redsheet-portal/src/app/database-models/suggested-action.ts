import { required, maxLength, range } from '@rx/annotations';

export class SuggestedAction {
    constructor(suggestedAction?: SuggestedAction )  {
        let properties = [ "cultureCountryId", "suggestedActionId", "suggestedActionValue",];
        for (let property of properties)
            if (suggestedAction && suggestedAction[property])
                this[property] = suggestedAction[property];
    }
 
    @range(1,2147483647)
	cultureCountryId : number =   undefined;
 
	suggestedActionId : number =   0 ;
 
    @required()
    @maxLength(500)
	suggestedActionValue : string =   undefined;
}
