import { required, maxLength, range, nested } from '@rx/annotations';

export class vTheirRequirementDetailRecord {
    constructor(vTheirRequirementDetailRecord?: vTheirRequirementDetailRecord )  {
        let properties = [ "ldo", "mdo", "projectRequirementId", "requirement", "sortOrder", "theirRequirementDetailId",];
        for (let property of properties)
            if (vTheirRequirementDetailRecord && vTheirRequirementDetailRecord[property])
                this[property] = vTheirRequirementDetailRecord[property];
    }
 
    @required()
    @maxLength(1000)
	ldo : string =   undefined;
 
    @required()
    @maxLength(1000)
	mdo : string =   undefined;
 
	projectRequirementId : number =   0 ;
 
    @required()
    @maxLength(1000)
	requirement : string =   undefined;
 
    @range(1,2147483647)
	sortOrder : number =   undefined;
 
    @range(1,2147483647)
	theirRequirementDetailId : number =   undefined;


}
