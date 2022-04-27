import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteTarget {
    constructor(vLiteTarget?: vLiteTarget )  {
        let properties = [ "liteProjectBackgroundId", "liteTargetDetail", "liteTargetId",];
        for (let property of properties)
            if (vLiteTarget && vLiteTarget[property])
                this[property] = vLiteTarget[property];
    }
 
	liteProjectBackgroundId : number =   0 ;
 
    @required()
    @maxLength(50)
	liteTargetDetail : string =   undefined;
 
    @range(1,2147483647)
	liteTargetId : number =   undefined;


}
