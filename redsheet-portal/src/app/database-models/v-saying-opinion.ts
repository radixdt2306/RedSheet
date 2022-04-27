import { required, maxLength, range } from '@rx/annotations';

export class vSayingOpinion {
    constructor(vSayingOpinion?: vSayingOpinion )  {
        let properties = [ "cultureCountryId", "sayingOpinionId", "sayingOpinionValue",];
        for (let property of properties)
            if (vSayingOpinion && vSayingOpinion[property])
                this[property] = vSayingOpinion[property];
    }
 
	cultureCountryId : number =   0 ;
 
    @range(1,2147483647)
	sayingOpinionId : number =   undefined;
 
    @required()
    @maxLength(500)
	sayingOpinionValue : string =   undefined;
}
