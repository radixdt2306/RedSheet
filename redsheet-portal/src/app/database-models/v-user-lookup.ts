import { required, maxLength, range, nested } from '@rx/annotations';

export class vUserLookup {
    constructor(vUserLookup?: vUserLookup )  {
        let properties = [ "companyId", "email", "requestorId", "userId", "userName",];
        for (let property of properties)
            if (vUserLookup && vUserLookup[property])
                this[property] = vUserLookup[property];
    }
 
    @required()
	companyId : string =   undefined;
 
    @required()
    @maxLength(150)
	email : string =   undefined;
 
    @required()
	requestorId : string =   undefined;
 
	userId : number =   0 ;
 
    @required()
    @maxLength(201)
	userName : string =   undefined;


}
