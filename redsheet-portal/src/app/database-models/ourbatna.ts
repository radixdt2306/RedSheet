import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectRequirement,  } from './'
export class Ourbatna {
    constructor(ourbatna?: Ourbatna )  {
        let properties = [ "ourbatnaId", "ourbatnaValue", "projectRequirementId",];
        for (let property of properties)
            if (ourbatna && ourbatna[property])
                this[property] = ourbatna[property];
    }
 
	ourbatnaId : number =   0 ;
 
    @required()
    @maxLength(400)
	ourbatnaValue : string =   undefined;
 
    @range(0,2147483647)
	projectRequirementId : number =   undefined;
	projectRequirement : ProjectRequirement  ;


}
