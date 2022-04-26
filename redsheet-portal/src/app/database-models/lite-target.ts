import { required, maxLength, range, nested } from '@rx/annotations';
import { LiteProjectBackground,  vLiteTargetRecord  } from './'
export class LiteTarget {
    constructor(liteTarget?: LiteTarget  | vLiteTargetRecord )  {
        let properties = [ "liteTargetDetail", "liteTargetId", "liteProjectBackgroundId",];
        for (let property of properties)
            if (liteTarget && liteTarget[property])
                this[property] = liteTarget[property];
    }
 
    @required()
    @maxLength(50)
	liteTargetDetail : string =   undefined;
 
	liteTargetId : number =   0 ;
 
    @range(0,2147483647)
	liteProjectBackgroundId : number =   undefined;
	liteProjectBackground : LiteProjectBackground  ;


}
