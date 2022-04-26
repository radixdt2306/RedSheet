import { required, maxLength, range, nested } from '@rx/annotations';

export class vPersonality {
    constructor(vPersonality?: vPersonality )  {
        let properties = [ "description", "personalityColor", "personalityId", "personalityKey", "personalityKeyText",];
        for (let property of properties)
            if (vPersonality && vPersonality[property])
                this[property] = vPersonality[property];
    }
 
    @maxLength(1000)
	description : string =   undefined;
 
    @required()
    @maxLength(50)
	personalityColor : string =   undefined;
 
	personalityId : number =   0 ;
 
    @maxLength(50)
	personalityKey : string =   undefined;
 
    @maxLength(10)
	personalityKeyText : string =   undefined;


}
