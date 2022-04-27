import { required, maxLength, range, nested } from '@rx/annotations';

export class vOurTheirRequirenmentDetail {
    constructor(vOurTheirRequirenmentDetail?: vOurTheirRequirenmentDetail )  {
        let properties = [ "isZoma", "ourLDO", "ourMDO", "ourRequirementDetailId", "ourRequirenment", "projectRequirementId", "requirementCategoryId", "theirLDO", "theirMDO", "theirRequirementDetailId", "theirRequirenment",];
        for (let property of properties)
            if (vOurTheirRequirenmentDetail && vOurTheirRequirenmentDetail[property])
                this[property] = vOurTheirRequirenmentDetail[property];
    }
 
	isZoma : boolean = false ;
 
    @required()
    @maxLength(1000)
	ourLDO : string =   undefined;
 
    @required()
    @maxLength(1000)
	ourMDO : string =   undefined;
 
	ourRequirementDetailId : number =   0 ;
 
    @required()
    @maxLength(1000)
	ourRequirenment : string =   undefined;
 
    @range(1,2147483647)
	projectRequirementId : number =   undefined;
 
    @range(1,2147483647)
	requirementCategoryId : number =   undefined;
 
    @required()
    @maxLength(1000)
	theirLDO : string =   undefined;
 
    @required()
    @maxLength(1000)
	theirMDO : string =   undefined;
 
    @range(1,2147483647)
	theirRequirementDetailId : number =   undefined;
 
    @required()
    @maxLength(1000)
	theirRequirenment : string =   undefined;


}
