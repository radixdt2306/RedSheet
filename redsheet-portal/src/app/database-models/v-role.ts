import { required, maxLength, range, nested } from '@rx/annotations';

export class vRole {
    constructor(vRole?: vRole )  {
        let properties = [ "roleId", "roleName", "status", "statusId",];
        for (let property of properties)
            if (vRole && vRole[property])
                this[property] = vRole[property];
    }
 
	roleId : number =   0 ;
 
    @required()
    @maxLength(50)
	roleName : string =   undefined;
 
    @required()
    @maxLength(100)
	status : string =   undefined;
 
    @range(1,2147483647)
	statusId : number =   undefined;


}
