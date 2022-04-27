import { required, maxLength, range, nested } from '@rx/annotations';

export class vRequestLog {
    constructor(vRequestLog?: vRequestLog )  {
        let properties = [ "applicationModuleId", "browserName", "clientIPAddress", "moduleMasterId", "moduleMasterName", "name", "parameters", "requestLogId", "requestTime", "serviceUri", "totalDuration", "userId",];
        for (let property of properties)
            if (vRequestLog && vRequestLog[property])
                this[property] = vRequestLog[property];
    }
 
	applicationModuleId : number =   0 ;
 
    @maxLength(200)
	browserName : string =   undefined;
 
    @maxLength(50)
	clientIPAddress : string =   undefined;
 
    @range(1,2147483647)
	moduleMasterId : number =   undefined;
 
    @maxLength(100)
	moduleMasterName : string =   undefined;
 
    @maxLength(201)
	name : string =   undefined;
 
    @required()
	parameters : string =   undefined;
 
    @range(1,2147483647)
	requestLogId : number =   undefined;
 
    @required()
	requestTime : Date =   undefined;
 
    @required()
    @maxLength(100)
	serviceUri : string =   undefined;
 
    @required()
	totalDuration : Date =   undefined;
 
	userId : number =   undefined;


}
