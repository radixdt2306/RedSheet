import { required, maxLength, range, nested } from '@rx/annotations';

export class vTeamRole {
    constructor(vTeamRole?: vTeamRole )  {
        let properties = [ "roleDescription", "teamRoleId", "teamRoleName",];
        for (let property of properties)
            if (vTeamRole && vTeamRole[property])
                this[property] = vTeamRole[property];
    }
 
    @maxLength(1000)
	roleDescription : string =   undefined;
 
	teamRoleId : number =   0 ;
 
    @required()
    @maxLength(200)
	teamRoleName : string =   undefined;


}
