import { required, maxLength, range, nested } from '@rx/annotations';

export class vLongTermObjectiveRecord {
    constructor(vLongTermObjectiveRecord?: vLongTermObjectiveRecord )  {
        let properties = [ "longTermObjectiveId", "longTermObjectiveValue", "projectBackgroundId",];
        for (let property of properties)
            if (vLongTermObjectiveRecord && vLongTermObjectiveRecord[property])
                this[property] = vLongTermObjectiveRecord[property];
    }
 
	longTermObjectiveId : number =   0 ;
 
    @required()
    @maxLength(1000)
	longTermObjectiveValue : string =   undefined;
 
    @range(1,2147483647)
	projectBackgroundId : number =   undefined;


}
