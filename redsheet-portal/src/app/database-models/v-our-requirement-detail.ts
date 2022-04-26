import { required, maxLength, range, nested } from '@rx/annotations';

export class vOurRequirementDetail {
    constructor(vOurRequirementDetail?: vOurRequirementDetail )  {
        let properties = [ "applicationObjectName", "fourStep", "ldo", "mdo", "ourRequirementDetailId", "projectRequirementId", "requirement", "secondStep", "thirdStep",];
        for (let property of properties)
            if (vOurRequirementDetail && vOurRequirementDetail[property])
                this[property] = vOurRequirementDetail[property];
    }
 
    @required()
    @maxLength(100)
	applicationObjectName : string =   undefined;
 
    @required()
    @maxLength(1000)
	fourStep : string =   undefined;
 
    @required()
    @maxLength(1000)
	ldo : string =   undefined;
 
    @required()
    @maxLength(1000)
	mdo : string =   undefined;
 
	ourRequirementDetailId : number =   0 ;
 
    @range(1,2147483647)
	projectRequirementId : number =   undefined;
 
    @required()
    @maxLength(1000)
	requirement : string =   undefined;
 
    @required()
    @maxLength(1000)
	secondStep : string =   undefined;
 
    @required()
    @maxLength(1000)
	thirdStep : string =   undefined;


}
