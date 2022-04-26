import { required, maxLength, range } from '@rx/annotations';

export class SayingOpinion {
    constructor(sayingOpinion?: SayingOpinion )  {
        let properties = [ "cultureCountryId", "sayingOpinionId", "sayingOpinionValue",];
        for (let property of properties)
            if (sayingOpinion && sayingOpinion[property])
                this[property] = sayingOpinion[property];
    }
 
    @range(1,2147483647)
	cultureCountryId : number =   undefined;
 
	sayingOpinionId : number =   0 ;
 
    @required()
    @maxLength(500)
	sayingOpinionValue : string =   undefined;
}
