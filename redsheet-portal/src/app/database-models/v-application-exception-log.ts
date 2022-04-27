import { required, maxLength, range, nested } from '@rx/annotations';

export class vApplicationExceptionLog {
    constructor(vApplicationExceptionLog?: vApplicationExceptionLog )  {
        let properties = [ "applicationExceptionLogId", "applicationModuleId", "exceptionDate", "exceptionSource", "exceptionType", "firstName", "innerException", "message", "moduleMasterId", "moduleMasterName", "stackTrace", "url", "userId",];
        for (let property of properties)
            if (vApplicationExceptionLog && vApplicationExceptionLog[property])
                this[property] = vApplicationExceptionLog[property];
    }
 
	applicationExceptionLogId : number =   0 ;
 
	applicationModuleId : number =   undefined;
 
    @required()
	exceptionDate : Date =   undefined;
 
    @required()
	exceptionSource : string =   undefined;
 
    @required()
	exceptionType : string =   undefined;
 
    @maxLength(100)
	firstName : string =   undefined;
 
    @required()
	innerException : string =   undefined;
 
    @required()
	message : string =   undefined;
 
	moduleMasterId : number =   undefined;
 
    @maxLength(100)
	moduleMasterName : string =   undefined;
 
    @required()
	stackTrace : string =   undefined;
 
    @required()
    @maxLength(200)
	url : string =   undefined;
 
    @range(1,2147483647)
	userId : number =   undefined;


}
