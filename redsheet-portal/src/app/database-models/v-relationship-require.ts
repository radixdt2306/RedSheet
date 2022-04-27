import { required, maxLength, range, nested } from '@rx/annotations';

export class vRelationshipRequire {
    constructor(vRelationshipRequire?: vRelationshipRequire )  {
        let properties = [ "className", "relationshipRequireId", "relationshipRequireName",];
        for (let property of properties)
            if (vRelationshipRequire && vRelationshipRequire[property])
                this[property] = vRelationshipRequire[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	relationshipRequireId : number =   0 ;
 
    @required()
    @maxLength(200)
	relationshipRequireName : string =   undefined;


}
