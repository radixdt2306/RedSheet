import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteRelationshipRequire {
    constructor(vLiteRelationshipRequire?: vLiteRelationshipRequire )  {
        let properties = [ "className", "liteRelationshipRequireId", "liteRelationshipRequireName",];
        for (let property of properties)
            if (vLiteRelationshipRequire && vLiteRelationshipRequire[property])
                this[property] = vLiteRelationshipRequire[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	liteRelationshipRequireId : number =   0 ;
 
    @required()
    @maxLength(200)
	liteRelationshipRequireName : string =   undefined;


}
