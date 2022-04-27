import { required, maxLength, range } from '@rx/annotations';

export class vAvoidSayingOpinion {
    constructor(vAvoidSayingOpinion?: vAvoidSayingOpinion )  {
        let properties = [ "avoidSayingOpinionId", "avoidSayingOpinionValue", "cultureCountryId",];
        for (let property of properties)
            if (vAvoidSayingOpinion && vAvoidSayingOpinion[property])
                this[property] = vAvoidSayingOpinion[property];
    }
 
    @range(1,2147483647)
	avoidSayingOpinionId : number =   undefined;
 
    @required()
    @maxLength(500)
	avoidSayingOpinionValue : string =   undefined;
 
	cultureCountryId : number =   0 ;
}
