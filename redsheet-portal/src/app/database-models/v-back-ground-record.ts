import { required, maxLength, range, nested } from '@rx/annotations';

export class vBackGroundRecord {
    constructor(vBackGroundRecord?: vBackGroundRecord )  {
        let properties = [ "focus", "negotiationTypeId", "negotiationTypeName", "opponentName", "projectBackgroundId", "projectModuleId", "reason", "valueObjectiveId", "valueObjectiveName",];
        for (let property of properties)
            if (vBackGroundRecord && vBackGroundRecord[property])
                this[property] = vBackGroundRecord[property];
    }
 
    @required()
    @maxLength(1000)
	focus : string =   undefined;
 
	negotiationTypeId : number =   0 ;
 
    @required()
    @maxLength(200)
	negotiationTypeName : string =   undefined;
 
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
 
    @required()
    @maxLength(200)
	valueObjectiveName : string =   undefined;


}
