import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectStakeholder {
    constructor(vProjectStakeholder?: vProjectStakeholder )  {
        let properties = [ "actionRequried", "className", "communicationModeName", "frequancy", "iconClassName", "projectModuleId", "projectStakeholderId", "stakeholderName",];
        for (let property of properties)
            if (vProjectStakeholder && vProjectStakeholder[property])
                this[property] = vProjectStakeholder[property];
    }
 
    @required()
    @maxLength(200)
	actionRequried : string =   undefined;
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	communicationModeName : string =   undefined;
 
    @required()
    @maxLength(250)
	frequancy : string =   undefined;
 
	iconClassName : string =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectStakeholderId : number =   undefined;
 
    @required()
    @maxLength(100)
	stakeholderName : string =   undefined;


}
