import { required, maxLength, range, nested } from '@rx/annotations';
import { Project, ProjectModule, User,  } from './'

export class EmailTransaction {
    constructor(public emailTransaction?: EmailTransaction )  {
        let properties = [ "EmailTransactionId", "ProjectId","EmailTo", "EmailFrom", "EmailSubject", "EmailMessage","EmailStatus","IsSystemGenerated","UserId","UpdateOn","UpdateBy","GetReply"];
        for (let property of properties)
            if (emailTransaction && emailTransaction[property])
                this[property] = emailTransaction[property];
    }
   
	EmailTransactionId : number =   0 ;
    
    @required()
    @maxLength(50)
	EmailTo : string =   undefined;
 
    @maxLength(50)
	EmailFrom : string =   undefined;
 
    @maxLength(50)
	EmailSubject : string =   undefined;
 
    @maxLength(500)
	EmailMessage : string =   undefined;
 
    @maxLength(15)
    EmailStatus : string=  undefined;

    UpdatedBy : number =   undefined;
 
	UpdatedOn : Date =   undefined;

    @range(0,2147483647)
	ProjectId : number =   undefined;
	project : Project  ;
 
    @range(0,2147483647)
	UserId : number =   undefined;
	user : User  ;

    IsSystemGenerated:boolean=  undefined;

    GetReply:boolean=  undefined;
    
}
