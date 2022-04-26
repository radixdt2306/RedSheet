import { required, maxLength, range, nested } from '@rx/annotations';

export class vOurbatna {
    constructor(vOurbatna?: vOurbatna )  {
        let properties = [ "ourbatnaId", "ourbatnaValue", "projectRequirementId",];
        for (let property of properties)
            if (vOurbatna && vOurbatna[property])
                this[property] = vOurbatna[property];
    }
 
	ourbatnaId : number =   0 ;
 
    @required()
    @maxLength(1000)
	ourbatnaValue : string =   undefined;
 
    @range(1,2147483647)
	projectRequirementId : number =   undefined;


}
