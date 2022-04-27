import { required, maxLength, range, nested } from '@rx/annotations';

export class vCommunicationPlanRecord {
    constructor(vCommunicationPlanRecord?: vCommunicationPlanRecord )  {
        let properties = [ "communicationPlanId", "mediaMeans", "message", "projectPreparationId", "to",];
        for (let property of properties)
            if (vCommunicationPlanRecord && vCommunicationPlanRecord[property])
                this[property] = vCommunicationPlanRecord[property];
    }
 
	communicationPlanId : number =   0 ;
 
    @required()
    @maxLength(1000)
	mediaMeans : string =   undefined;
 
    @required()
    @maxLength(1000)
	message : string =   undefined;
 
    @range(1,2147483647)
	projectPreparationId : number =   undefined;
 
    @required()
    @maxLength(1000)
	to : string =   undefined;


}
