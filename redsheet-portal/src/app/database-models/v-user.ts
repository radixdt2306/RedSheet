import { required, maxLength, range, nested } from '@rx/annotations';

export class vUser {
    constructor(vUser?: vUser )  {
        let properties = [ "address", "city", "companyId", "companyName", "email", "firstName", "initial", "lastName", "mobile", "office", "requestorId", "state", "status", "title", "userId", "zipCode",];
        for (let property of properties)
            if (vUser && vUser[property])
                this[property] = vUser[property];
    }
 
    @required()
    @maxLength(100)
	address : string =   undefined;
 
    @required()
    @maxLength(50)
	city : string =   undefined;
 
	companyId : string =   undefined;
 
    @required()
    @maxLength(100)
	companyName : string =   undefined;
 
    @required()
    @maxLength(150)
	email : string =   undefined;
 
    @required()
    @maxLength(100)
	firstName : string =   undefined;
 
    @required()
    @maxLength(6)
	initial : string =   undefined;
 
    @required()
    @maxLength(100)
	lastName : string =   undefined;
 
    @required()
    @maxLength(20)
	mobile : string =   undefined;
 
    @required()
    @maxLength(20)
	office : string =   undefined;
 
	requestorId : string =   undefined;
 
    @required()
    @maxLength(100)
	state : string =   undefined;
 
    @required()
    @maxLength(100)
	status : string =   undefined;
 
    @required()
    @maxLength(50)
	title : string =   undefined;
 
	userId : number =   0 ;
 
    @required()
    @maxLength(10)
	zipCode : string =   undefined;


}
