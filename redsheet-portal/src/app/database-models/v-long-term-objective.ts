import { required, maxLength, range, nested } from '@rx/annotations';

export class vLongTermObjective {
    constructor(vLongTermObjective?: vLongTermObjective )  {
        let properties = [ "longTermObjectiveId", "longTermObjectiveValue", "projectBackgroundId",];
        for (let property of properties)
            if (vLongTermObjective && vLongTermObjective[property])
                this[property] = vLongTermObjective[property];
    }

	longTermObjectiveId : number =   0 ;

    @required()
    @maxLength(100)
	longTermObjectiveValue : string =   undefined;

    @range(1,2147483647)
	projectBackgroundId : number =   undefined;


}
