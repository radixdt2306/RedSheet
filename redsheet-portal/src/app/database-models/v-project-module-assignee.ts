import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectModuleAssignee {
    constructor(vProjectModuleAssignee?: vProjectModuleAssignee )  {
        let properties = [ "projectModuleAssigneeId", "projectModuleId", "userName",];
        for (let property of properties)
            if (vProjectModuleAssignee && vProjectModuleAssignee[property])
                this[property] = vProjectModuleAssignee[property];
    }
 
	projectModuleAssigneeId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @maxLength(50)
	userName : string =   undefined;


}
