import { required, maxLength, range, nested } from '@rx/annotations';
import { Ourbatna, TheirBatna,  } from './'
export class BatnaDetail {
    constructor(batnaDetail?: BatnaDetail )  {
        let properties = [ "batnaDetailId", "batnaDetailValue", "ourbatnas", "theirBatnas",];
        for (let property of properties)
            if (batnaDetail && batnaDetail[property])
                this[property] = batnaDetail[property];
    }
 
	batnaDetailId : number =   0 ;
 
    @required()
    @maxLength(1000)
	batnaDetailValue : string =   undefined;
	@nested(Ourbatna)
	ourbatnas: Ourbatna[];

	@nested(TheirBatna)
	theirBatnas: TheirBatna[];



}
