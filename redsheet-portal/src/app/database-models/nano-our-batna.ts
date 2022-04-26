import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule,  vNanoOurBatnaRecord  } from './'
export class NanoOurBatna {
    constructor(nanoOurBatna?: NanoOurBatna  | vNanoOurBatnaRecord )  {
        let properties = [ "nanoOurBatnaId", "nanoOurBatnaValue", "projectModuleId",];
        for (let property of properties)
            if (nanoOurBatna && nanoOurBatna[property])
                this[property] = nanoOurBatna[property];
    }
 
	nanoOurBatnaId : number =   0 ;
 
    @required()
    @maxLength(400)
	nanoOurBatnaValue : string =   undefined;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;


}
