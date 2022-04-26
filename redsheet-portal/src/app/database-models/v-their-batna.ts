import { required, maxLength, range, nested } from '@rx/annotations';

export class vTheirBatna {
    constructor(vTheirBatna?: vTheirBatna )  {
        let properties = [ "projectRequirementId", "theirBatanValue", "theirBatnaId",];
        for (let property of properties)
            if (vTheirBatna && vTheirBatna[property])
                this[property] = vTheirBatna[property];
    }
 
	projectRequirementId : number =   0 ;
 
    @required()
    @maxLength(1000)
	theirBatanValue : string =   undefined;
 
    @range(1,2147483647)
	theirBatnaId : number =   undefined;


}
