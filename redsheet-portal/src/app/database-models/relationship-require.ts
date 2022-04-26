import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectBackground,  } from './'
export class RelationshipRequire {
    constructor(relationshipRequire?: RelationshipRequire )  {
        let properties = [ "className", "relationshipRequireId", "relationshipRequireName", "projectBackgrounds",];
        for (let property of properties)
            if (relationshipRequire && relationshipRequire[property])
                this[property] = relationshipRequire[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	relationshipRequireId : number =   0 ;
 
    @required()
    @maxLength(200)
	relationshipRequireName : string =   undefined;
	@nested(ProjectBackground)
	projectBackgrounds: ProjectBackground[];



}
