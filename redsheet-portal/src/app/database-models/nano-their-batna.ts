import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule,  vNanoTheirBatnaRecord  } from './'
export class NanoTheirBatna {
    constructor(nanoTheirBatna?: NanoTheirBatna  | vNanoTheirBatnaRecord )  {
        let properties = [ "nanoTheirBatnaId", "nanoTheirBatnaValue", "projectModuleId",];
        for (let property of properties)
            if (nanoTheirBatna && nanoTheirBatna[property])
                this[property] = nanoTheirBatna[property];
    }
 
	nanoTheirBatnaId : number =   0 ;
 
    @required()
    @maxLength(400)
	nanoTheirBatnaValue : string =   undefined;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;


}
