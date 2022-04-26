import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectGameDetailRecord {
    constructor(vProjectGameDetailRecord?: vProjectGameDetailRecord )  {
        let properties = [ "currentGameId", "notes", "projectGameDetailId", "projectModuleId", "theirCurrentGameId", "theirEventGameId",];
        for (let property of properties)
            if (vProjectGameDetailRecord && vProjectGameDetailRecord[property])
                this[property] = vProjectGameDetailRecord[property];
    }
 
    @range(1,2147483647)
	currentGameId : number =   undefined;
 
    @required()
    @maxLength(1000)
	notes : string =   undefined;
 
	projectGameDetailId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @range(1,2147483647)
	theirCurrentGameId : number =   undefined;
 
    @range(1,2147483647)
	theirEventGameId : number =   undefined;


}
