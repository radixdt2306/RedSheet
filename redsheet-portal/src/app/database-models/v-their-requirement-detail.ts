import { required, maxLength, range, nested } from '@rx/annotations';

export class vTheirRequirementDetail {
    constructor(vTheirRequirementDetail?: vTheirRequirementDetail )  {
        let properties = [ "isZoma", "ldo", "mdo", "projectRequirementId", "requirement", "sortOrder", "theirRequirementDetailId",];
        for (let property of properties)
            if (vTheirRequirementDetail && vTheirRequirementDetail[property])
                this[property] = vTheirRequirementDetail[property];
    }
 
	isZoma : boolean = false ;
 
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
