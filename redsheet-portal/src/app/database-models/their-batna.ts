import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectRequirement,  } from './'
export class TheirBatna {
    constructor(theirBatna?: TheirBatna )  {
        let properties = [ "theirBatanValue", "theirBatnaId", "projectRequirementId",];
        for (let property of properties)
            if (theirBatna && theirBatna[property])
                this[property] = theirBatna[property];
    }
 
    @required()
    @maxLength(400)
	theirBatanValue : string =   undefined;
 
	theirBatnaId : number =   0 ;
 
    @range(0,2147483647)
	projectRequirementId : number =   undefined;
	projectRequirement : ProjectRequirement  ;


}
