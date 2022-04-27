import { required, maxLength, range, nested } from '@rx/annotations';

export class vUserRecord {
    constructor(vUserRecord?: vUserRecord )  {
        let properties = [ "address", "city", "companyId", "companyName", "email", "firstName", "initial", "lastName", "mobile", "office", "requestorId", "stateId", "statusId", "title", "userId", "zipCode",];
        for (let property of properties)
            if (vUserRecord && vUserRecord[property])
                this[property] = vUserRecord[property];
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
 
	stateId : number =   0 ;
 
	statusId : number =   undefined;
 
    @required()
    @maxLength(50)
	title : string =   undefined;
 
    @range(1,2147483647)
	userId : number =   undefined;
 
    @required()
    @maxLength(10)
	zipCode : string =   undefined;


}
