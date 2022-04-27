import { required, maxLength, range, nested } from '@rx/annotations';

export class ApplicationObject {
    constructor(applicationObject?: ApplicationObject )  {
        let properties = [ "applicationObjectId", "applicationObjectName", "applicationObjectTypeId",];
        for (let property of properties)
            if (applicationObject && applicationObject[property])
                this[property] = applicationObject[property];
    }
 
	applicationObjectId : number =   0 ;
 
    @required()
    @maxLength(100)
	applicationObjectName : string =   undefined;
 
    @range(1,2147483647)
	applicationObjectTypeId : number =   undefined;


}
