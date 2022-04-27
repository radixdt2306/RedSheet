import { required, maxLength, range, nested } from '@rx/annotations';

export class vGameRecord {
    constructor(vGameRecord?: vGameRecord )  {
        let properties = [ "gameId", "gameTypeId", "play", "projectGameDetailId", "trigger",];
        for (let property of properties)
            if (vGameRecord && vGameRecord[property])
                this[property] = vGameRecord[property];
    }
 
	gameId : number =   0 ;
 
    @range(1,2147483647)
	gameTypeId : number =   undefined;
 
    @required()
    @maxLength(1000)
	play : string =   undefined;
 
    @range(1,2147483647)
	projectGameDetailId : number =   undefined;
 
    @required()
    @maxLength(1000)
	trigger : string =   undefined;


}
