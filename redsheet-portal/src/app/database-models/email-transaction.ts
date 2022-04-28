import { required, maxLength, range, nested } from '@rx/annotations';
import { Project, ProjectModule, User,  } from './'

export class EmailTransaction {
    constructor(public emailTransaction?: EmailTransaction )  {
        let properties = [ "emailTransactionId", "emailTo", "emailFrom", "emailSubject", "emailMessage", "entryDate", "entryBy", "projectId", "projectModuleId","userId",];
        for (let property of properties)
            if (emailTransaction && emailTransaction[property])
                this[property] = emailTransaction[property];
    }
   
	emailTransactionId : number =   0 ;
    
    @required()
    @maxLength(50)
	emailTo : string =   undefined;
 
    @maxLength(50)
	emailFrom : string =   undefined;
 
    @maxLength(50)
	emailSubject : string =   undefined;
 
    @maxLength(500)
	emailMessage : string =   undefined;
 
    updatedBy : number =   undefined;
 
	updatedOn : Date =   undefined;

    @range(0,2147483647)
	projectId : number =   undefined;
	project : Project  ;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
 
    @range(0,2147483647)
	userId : number =   undefined;
	user : User  ;
    
}
