import { required, maxLength, range, nested } from '@rx/annotations';
import { NanoScopeToNegotiateObjective,  } from './'
export class NanoRelationshipRequire {
    constructor(nanoRelationshipRequire?: NanoRelationshipRequire )  {
        let properties = [ "className", "nanoRelationshipRequireId", "nanoRelationshipRequireName", "nanoScopeToNegotiateObjectives",];
        for (let property of properties)
            if (nanoRelationshipRequire && nanoRelationshipRequire[property])
                this[property] = nanoRelationshipRequire[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	nanoRelationshipRequireId : number =   0 ;
 
    @required()
    @maxLength(200)
	nanoRelationshipRequireName : string =   undefined;
	@nested(NanoScopeToNegotiateObjective)
	nanoScopeToNegotiateObjectives: NanoScopeToNegotiateObjective[];



}
