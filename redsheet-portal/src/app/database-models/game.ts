import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectGameDetail,  vGameRecord  } from './'
export class Game {
    constructor(game?: Game  | vGameRecord )  {
        let properties = [ "gameId", "play", "trigger", "gameTypeId", "projectGameDetailId",];
        for (let property of properties)
            if (game && game[property])
                this[property] = game[property];
    }
 
	gameId : number =   0 ;
 
    @required()
    @maxLength(150)
	play : string =   undefined;
 
    @required()
    @maxLength(150)
	trigger : string =   undefined;
 
    @range(0,2147483647)
	gameTypeId : number =   undefined;
 
    @range(0,2147483647)
	projectGameDetailId : number =   undefined;
	projectGameDetail : ProjectGameDetail  ;


}
