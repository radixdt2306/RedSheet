import { required, maxLength, range, nested } from '@rx/annotations';

export class ApplicationTable {
    constructor(applicationTable?: ApplicationTable )  {
        let properties = [ "applicationTableId", "applicationTableName", "tableTypeId",];
        for (let property of properties)
            if (applicationTable && applicationTable[property])
                this[property] = applicationTable[property];
    }
 
	applicationTableId : number =   0 ;
 
    @required()
    @maxLength(100)
	applicationTableName : string =   undefined;
 
    @range(1,2147483647)
	tableTypeId : number =   undefined;


}
