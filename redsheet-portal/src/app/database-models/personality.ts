import { required, maxLength, range, nested } from '@rx/annotations';
import { TheirTeamMember,  } from './'
export class Personality {
    constructor(personality?: Personality )  {
        let properties = [ "description", "personalityColor", "personalityId", "personalityKey", "personalityKeyText", "theirTeamMembers",];
        for (let property of properties)
            if (personality && personality[property])
                this[property] = personality[property];
    }
 
    @maxLength(1000)
	description : string =   undefined;
 
    @required()
    @maxLength(50)
	personalityColor : string =   undefined;
 
	personalityId : number =   0 ;
 
    @maxLength(50)
	personalityKey : string =   undefined;
 
    @maxLength(10)
	personalityKeyText : string =   undefined;
	@nested(TheirTeamMember)
	theirTeamMembers: TheirTeamMember[];



}
