import { required, maxLength, range } from '@rx/annotations';

export class vSuggestedAction {
    constructor(vSuggestedAction?: vSuggestedAction )  {
        let properties = [ "cultureCountryId", "suggestedActionId", "suggestedActionValue",];
        for (let property of properties)
            if (vSuggestedAction && vSuggestedAction[property])
                this[property] = vSuggestedAction[property];
    }
 
	cultureCountryId : number =   0 ;
 
    @range(1,2147483647)
	suggestedActionId : number =   undefined;
 
    @required()
    @maxLength(500)
	suggestedActionValue : string =   undefined;
}
