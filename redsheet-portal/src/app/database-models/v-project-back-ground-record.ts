import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectBackGroundRecord {
    constructor(vProjectBackGroundRecord?: vProjectBackGroundRecord )  {
        let properties = [ "focus", "negotiationTypeId", "opponentName", "projectBackgroundId", "projectModuleId", "reason", "valueObjectiveId",];
        for (let property of properties)
            if (vProjectBackGroundRecord && vProjectBackGroundRecord[property])
                this[property] = vProjectBackGroundRecord[property];
    }
 
    @required()
    @maxLength(1000)
	focus : string =   undefined;
 
	negotiationTypeId : number =   0 ;
 
    @required()
    @maxLength(1000)
	opponentName : string =   undefined;
 
    @range(1,2147483647)
	projectBackgroundId : number =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @required()
    @maxLength(1000)
	reason : string =   undefined;
 
    @range(1,2147483647)
	valueObjectiveId : number =   undefined;


}
