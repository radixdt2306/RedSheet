import { required, maxLength, range, nested } from '@rx/annotations';

export class ScheduleEmail {
    constructor(scheduleEmail?: ScheduleEmail )  {
        let properties = [ "emailFrom", "emailTemplateName", "emailTo", "inactivityDays", "isSentScheduleEmail", "moduleName", "projectId", "projectName", "requestedDateTime", "scheduleEmailId",];
        for (let property of properties)
            if (scheduleEmail && scheduleEmail[property])
                this[property] = scheduleEmail[property];
    }
 
    @required()
    @maxLength(200)
	emailFrom : string =   undefined;
 
    @required()
    @maxLength(200)
	emailTemplateName : string =   undefined;
 
    @required()
    @maxLength(200)
	emailTo : string =   undefined;
 
    @range(1,2147483647)
	inactivityDays : number =   undefined;
 
	isSentScheduleEmail : boolean = false ;
 
    @maxLength(1000)
	moduleName : string =   undefined;
 
    @range(1,2147483647)
	projectId : number =   undefined;
 
    @required()
    @maxLength(1000)
	projectName : string =   undefined;
 
    @required()
	requestedDateTime : Date =   undefined;
 
	scheduleEmailId : number =   0 ;


}
