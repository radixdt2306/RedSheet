import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectStakeholderRecord {
    constructor(vProjectStakeholderRecord?: vProjectStakeholderRecord )  {
        let properties = [ "frequancy", "projectModuleId", "projectStakeholderId", "stakeholderName", "stakeholderTypeId",];
        for (let property of properties)
            if (vProjectStakeholderRecord && vProjectStakeholderRecord[property])
                this[property] = vProjectStakeholderRecord[property];
    }
 
    @required()
    @maxLength(250)
	frequancy : string =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectStakeholderId : number =   undefined;
 
    @required()
    @maxLength(100)
	stakeholderName : string =   undefined;
 
    @range(1,2147483647)
	stakeholderTypeId : number =   undefined;


}
