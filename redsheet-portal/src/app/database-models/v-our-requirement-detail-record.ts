import { required, maxLength, range, nested } from '@rx/annotations';

export class vOurRequirementDetailRecord {
    constructor(vOurRequirementDetailRecord?: vOurRequirementDetailRecord )  {
        let properties = [ "fourStep", "ldo", "mdo", "ourRequirementDetailId", "painFactorId", "projectRequirementId", "requirement", "secondStep", "thirdStep",];
        for (let property of properties)
            if (vOurRequirementDetailRecord && vOurRequirementDetailRecord[property])
                this[property] = vOurRequirementDetailRecord[property];
    }
 
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
	painFactorId : number =   undefined;
 
    @range(1,2147483647)
	projectRequirementId : number =   undefined;
 
    @required()
    @maxLength(1000)
	requirement : string =   undefined;
 
    @maxLength(1000)
	secondStep : string =   undefined;
 
    @maxLength(1000)
	thirdStep : string =   undefined;


}
