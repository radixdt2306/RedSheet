import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoTheirBatnaRecord {
    constructor(vNanoTheirBatnaRecord?: vNanoTheirBatnaRecord )  {
        let properties = [ "nanoTheirBatnaId", "nanoTheirBatnaValue", "projectModuleId",];
        for (let property of properties)
            if (vNanoTheirBatnaRecord && vNanoTheirBatnaRecord[property])
                this[property] = vNanoTheirBatnaRecord[property];
    }
 
	nanoTheirBatnaId : number =   0 ;
 
    @required()
    @maxLength(1000)
	nanoTheirBatnaValue : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
