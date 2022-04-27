import { required, maxLength, range, nested } from '@rx/annotations';

export class ApplicationExceptionLog {
    constructor(applicationExceptionLog?: ApplicationExceptionLog )  {
        let properties = [ "applicationExceptionLogId", "applicationModuleId", "applicationTimeZoneId", "exceptionDate", "exceptionSource", "exceptionType", "innerException", "message", "requestMethod", "stackTrace", "url", "userId",];
        for (let property of properties)
            if (applicationExceptionLog && applicationExceptionLog[property])
                this[property] = applicationExceptionLog[property];
    }
 
	applicationExceptionLogId : number =   0 ;
 
	applicationModuleId : number =   undefined;
 
	applicationTimeZoneId : number =   undefined;
 
    @required()
	exceptionDate : Date =   undefined;
 
    @required()
	exceptionSource : string =   undefined;
 
    @required()
	exceptionType : string =   undefined;
 
    @required()
	innerException : string =   undefined;
 
    @required()
	message : string =   undefined;
 
    @maxLength(10)
	requestMethod : string =   undefined;
 
    @required()
	stackTrace : string =   undefined;
 
    @required()
    @maxLength(200)
	url : string =   undefined;
 
    @range(1,2147483647)
	userId : number =   undefined;


}
