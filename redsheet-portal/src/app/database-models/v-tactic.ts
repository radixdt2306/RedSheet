import { required, maxLength, range, nested } from '@rx/annotations';

export class vTactic {
    constructor(vTactic?: vTactic )  {
        let properties = [ "tacticId", "tacticName",];
        for (let property of properties)
            if (vTactic && vTactic[property])
                this[property] = vTactic[property];
    }
 
	tacticId : number =   0 ;
 
    @required()
    @maxLength(200)
	tacticName : string =   undefined;


}
