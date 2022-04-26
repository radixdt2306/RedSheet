import { required, maxLength, range, nested } from '@rx/annotations';

export class ApplicationObjectType {
    constructor(applicationObjectType?: ApplicationObjectType )  {
        let properties = [ "applicationObjectTypeId", "applicationObjectTypeName",];
        for (let property of properties)
            if (applicationObjectType && applicationObjectType[property])
                this[property] = applicationObjectType[property];
    }
 
	applicationObjectTypeId : number =   0 ;
 
    @required()
    @maxLength(100)
	applicationObjectTypeName : string =   undefined;


}
