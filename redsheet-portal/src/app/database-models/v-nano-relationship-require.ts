import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoRelationshipRequire {
    constructor(vNanoRelationshipRequire?: vNanoRelationshipRequire )  {
        let properties = [ "className", "nanoRelationshipRequireId", "nanoRelationshipRequireName",];
        for (let property of properties)
            if (vNanoRelationshipRequire && vNanoRelationshipRequire[property])
                this[property] = vNanoRelationshipRequire[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	nanoRelationshipRequireId : number =   0 ;
 
    @required()
    @maxLength(200)
	nanoRelationshipRequireName : string =   undefined;


}
