import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoOurBatna {
    constructor(vNanoOurBatna?: vNanoOurBatna )  {
        let properties = [ "nanoOurBatnaId", "nanoOurBatnaValue", "projectModuleId",];
        for (let property of properties)
            if (vNanoOurBatna && vNanoOurBatna[property])
                this[property] = vNanoOurBatna[property];
    }
 
	nanoOurBatnaId : number =   0 ;
 
    @required()
    @maxLength(1000)
	nanoOurBatnaValue : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
