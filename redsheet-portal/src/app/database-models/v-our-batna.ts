import { required, maxLength, range, nested } from '@rx/annotations';

export class vOurBatna {
    constructor(vOurBatna?: vOurBatna )  {
        let properties = [ "ourbatnaId", "ourbatnaValue", "projectRequirementId",];
        for (let property of properties)
            if (vOurBatna && vOurBatna[property])
                this[property] = vOurBatna[property];
    }
 
	ourbatnaId : number =   0 ;
 
    @required()
    @maxLength(1000)
	ourbatnaValue : string =   undefined;
 
    @range(1,2147483647)
	projectRequirementId : number =   undefined;


}
