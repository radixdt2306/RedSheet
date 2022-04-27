import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoTheirBatna {
    constructor(vNanoTheirBatna?: vNanoTheirBatna )  {
        let properties = [ "nanoTheirBatnaId", "nanoTheirBatnaValue", "projectModuleId",];
        for (let property of properties)
            if (vNanoTheirBatna && vNanoTheirBatna[property])
                this[property] = vNanoTheirBatna[property];
    }
 
	nanoTheirBatnaId : number =   0 ;
 
    @required()
    @maxLength(1000)
	nanoTheirBatnaValue : string =   undefined;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;


}
