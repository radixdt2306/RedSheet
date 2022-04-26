import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectBackground,  } from './'
export class NegotiationType {
    constructor(negotiationType?: NegotiationType )  {
        let properties = [ "className", "negotiationTypeId", "negotiationTypeName", "projectBackgrounds",];
        for (let property of properties)
            if (negotiationType && negotiationType[property])
                this[property] = negotiationType[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	negotiationTypeId : number =   0 ;
 
    @required()
    @maxLength(200)
	negotiationTypeName : string =   undefined;
	@nested(ProjectBackground)
	projectBackgrounds: ProjectBackground[];



}
