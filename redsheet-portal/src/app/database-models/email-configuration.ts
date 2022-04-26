import { required, maxLength, range, nested } from '@rx/annotations';

export class EmailConfiguration {
    constructor(emailConfiguration?: EmailConfiguration )  {
        let properties = [ "defaultCredentials", "deliveryMethod", "emailConfigurationId", "enableSSL", "host", "isActive", "password", "port", "userName",];
        for (let property of properties)
            if (emailConfiguration && emailConfiguration[property])
                this[property] = emailConfiguration[property];
    }
 
	defaultCredentials : boolean = false ;
 
    @maxLength(100)
	deliveryMethod : string =   undefined;
 
	emailConfigurationId : number =   0 ;
 
	enableSSL : boolean = false ;
 
    @required()
    @maxLength(100)
	host : string =   undefined;
 
	isActive : boolean = false ;
 
    @maxLength(100)
	password : string =   undefined;
 
    @range(1,2147483647)
	port : number =   undefined;
 
    @maxLength(200)
	userName : string =   undefined;


}
