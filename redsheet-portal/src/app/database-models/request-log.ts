import { required, maxLength, range, nested } from '@rx/annotations';

export class RequestLog {
    constructor(requestLog?: RequestLog )  {
        let properties = [ "applicationModuleId", "authorizationHeader", "browserName", "clientIPAddress", "contentLength", "cookies", "parameters", "recordId", "requestLogId", "requestMethod", "requestTime", "responseStatusCode", "serviceUri", "totalDuration", "userId",];
        for (let property of properties)
            if (requestLog && requestLog[property])
                this[property] = requestLog[property];
    }
 
	applicationModuleId : number =   undefined;
 
	authorizationHeader : string =   undefined;
 
    @maxLength(200)
	browserName : string =   undefined;
 
    @maxLength(50)
	clientIPAddress : string =   undefined;
 
	contentLength : number =   undefined;
 
	cookies : string =   undefined;
 
    @required()
	parameters : string =   undefined;
 
	recordId : number =   undefined;
 
	requestLogId : number =   0 ;
 
    @required()
    @maxLength(10)
	requestMethod : string =   undefined;
 
    @required()
	requestTime : Date =   undefined;
 
    @range(1,2147483647)
	responseStatusCode : number =   undefined;
 
    @required()
    @maxLength(100)
	serviceUri : string =   undefined;
 
    @required()
	totalDuration : Date =   undefined;
 
	userId : number =   undefined;


}
