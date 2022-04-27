import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteProjectBackground,  } from './'
export class LiteRelationshipRequire {
    constructor(liteRelationshipRequire?: LiteRelationshipRequire )  {
        let properties = [ "className", "liteRelationshipRequireId", "liteRelationshipRequireName", "liteProjectBackgrounds",];
        for (let property of properties)
            if (liteRelationshipRequire && liteRelationshipRequire[property])
                this[property] = liteRelationshipRequire[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	liteRelationshipRequireId : number =   0 ;
 
    @required()
    @maxLength(200)
	liteRelationshipRequireName : string =   undefined;
	@nested(LiteProjectBackground)
	liteProjectBackgrounds: LiteProjectBackground[];



}
