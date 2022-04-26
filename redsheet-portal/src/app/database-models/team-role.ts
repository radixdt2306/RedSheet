import { required, maxLength, range, nested } from '@rx/annotations';
import { OurTeamMember,  } from './'
export class TeamRole {
    constructor(teamRole?: TeamRole )  {
        let properties = [ "roleDescription", "teamRoleId", "teamRoleName", "ourTeamMembers",];
        for (let property of properties)
            if (teamRole && teamRole[property])
                this[property] = teamRole[property];
    }
 
    @maxLength(1000)
	roleDescription : string =   undefined;
 
	teamRoleId : number =   0 ;
 
    @required()
    @maxLength(200)
	teamRoleName : string =   undefined;
	@nested(OurTeamMember)
	ourTeamMembers: OurTeamMember[];



}
