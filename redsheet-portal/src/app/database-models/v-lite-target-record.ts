import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteTargetRecord {
    constructor(vLiteTargetRecord?: vLiteTargetRecord )  {
        let properties = [ "liteProjectBackgroundId", "liteTargetDetail", "liteTargetId",];
        for (let property of properties)
            if (vLiteTargetRecord && vLiteTargetRecord[property])
                this[property] = vLiteTargetRecord[property];
    }
 
	liteProjectBackgroundId : number =   0 ;
 
    @required()
    @maxLength(50)
	liteTargetDetail : string =   undefined;
 
    @range(1,2147483647)
	liteTargetId : number =   undefined;


}
