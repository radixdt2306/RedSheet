import { required, maxLength, range } from '@rx/annotations';

export class PainFactor {
    constructor(painFactor?: PainFactor )  {
        let properties = [ "painFactorId", "painFactorName",];
        for (let property of properties)
            if (painFactor && painFactor[property])
                this[property] = painFactor[property];
    }
 
	painFactorId : number =   0 ;
 
    @required()
    @maxLength(100)
	painFactorName : string =   undefined;
}
