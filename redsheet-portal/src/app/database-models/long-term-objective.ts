import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectBackground,  vLongTermObjectiveRecord  } from './'
export class LongTermObjective {
    constructor(longTermObjective?: LongTermObjective  | vLongTermObjectiveRecord )  {
        let properties = [ "longTermObjectiveId", "longTermObjectiveValue", "projectBackgroundId",];
        for (let property of properties)
            if (longTermObjective && longTermObjective[property])
                this[property] = longTermObjective[property];
    }
 
	longTermObjectiveId : number =   0 ;
 
    @required()
    @maxLength(100)
	longTermObjectiveValue : string =   undefined;
 
    @range(0,2147483647)
	projectBackgroundId : number =   undefined;
	projectBackground : ProjectBackground  ;


}
