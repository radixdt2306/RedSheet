import { required, maxLength, range } from '@rx/annotations';

export class vTeamMember {
    constructor(vTeamMember?: vTeamMember )  {
        let properties = [ "userId", "userName",];
        for (let property of properties)
            if (vTeamMember && vTeamMember[property])
                this[property] = vTeamMember[property];
    }
 
	userId : number =   0 ;
 
    @required()
    @maxLength(201)
	userName : string =   undefined;
}
