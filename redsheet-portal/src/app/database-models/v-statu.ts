import { required, maxLength, range } from '@rx/annotations';

export class vStatu {
    constructor(vStatu?: vStatu )  {
        let properties = [ "statusId", "statusName",];
        for (let property of properties)
            if (vStatu && vStatu[property])
                this[property] = vStatu[property];
    }
 
    @range(1,2147483647)
	statusId : number =   undefined;
 
    @required()
    @maxLength(100)
	statusName : string =   undefined;
}
