import { required, maxLength, range } from '@rx/annotations';

export class AvoidSayingOpinion {
    constructor(avoidSayingOpinion?: AvoidSayingOpinion )  {
        let properties = [ "avoidSayingOpinionId", "avoidSayingOpinionValue", "cultureCountryId",];
        for (let property of properties)
            if (avoidSayingOpinion && avoidSayingOpinion[property])
                this[property] = avoidSayingOpinion[property];
    }
 
	avoidSayingOpinionId : number =   0 ;
 
    @required()
    @maxLength(500)
	avoidSayingOpinionValue : string =   undefined;
 
    @range(1,2147483647)
	cultureCountryId : number =   undefined;
}
