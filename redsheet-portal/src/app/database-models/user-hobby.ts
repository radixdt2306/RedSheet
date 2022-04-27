import { required, maxLength, range, nested } from '@rx/annotations';

export class UserHobby {
    constructor(userHobby?: UserHobby )  {
        let properties = [ "hobbyId", "userHobbyId", "userId",];
        for (let property of properties)
            if (userHobby && userHobby[property])
                this[property] = userHobby[property];
    }
 
    @range(1,2147483647)
	hobbyId : number =   undefined;
 
	userHobbyId : number =   0 ;
 
    @range(1,2147483647)
	userId : number =   undefined;


}
