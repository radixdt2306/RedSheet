import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectPreparationRecord {
    constructor(vProjectPreparationRecord?: vProjectPreparationRecord )  {
        let properties = [ "elevatorSpeech", "preConditioningMessage", "projectModuleId", "projectPreparationId",];
        for (let property of properties)
            if (vProjectPreparationRecord && vProjectPreparationRecord[property])
                this[property] = vProjectPreparationRecord[property];
    }
 
    @required()
    @maxLength(1000)
	elevatorSpeech : string =   undefined;
 
    @required()
    @maxLength(1000)
	preConditioningMessage : string =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectPreparationId : number =   undefined;


}
