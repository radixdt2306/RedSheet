import { required, maxLength, range, nested } from '@rx/annotations';

export class vBatnaDetail {
    constructor(vBatnaDetail?: vBatnaDetail )  {
        let properties = [ "batnaDetailId", "batnaDetailValue",];
        for (let property of properties)
            if (vBatnaDetail && vBatnaDetail[property])
                this[property] = vBatnaDetail[property];
    }
 
	batnaDetailId : number =   0 ;
 
    @required()
    @maxLength(1000)
	batnaDetailValue : string =   undefined;


}
