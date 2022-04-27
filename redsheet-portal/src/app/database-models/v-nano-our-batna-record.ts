import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoOurBatnaRecord {
    constructor(vNanoOurBatnaRecord?: vNanoOurBatnaRecord )  {
        let properties = [ "nanoOurBatnaId", "nanoOurBatnaValue", "projectModuleId",];
        for (let property of properties)
            if (vNanoOurBatnaRecord && vNanoOurBatnaRecord[property])
                this[property] = vNanoOurBatnaRecord[property];
    }
 
	nanoOurBatnaId : number =   0 ;
 
    @required()
    @maxLength(1000)
	nanoOurBatnaValue : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
