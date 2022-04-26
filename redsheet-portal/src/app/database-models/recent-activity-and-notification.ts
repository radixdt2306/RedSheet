import { required, maxLength, range, nested } from '@rx/annotations';
import { Project, ProjectModule, User,  } from './'
export class RecentActivityAndNotification {
    constructor(recentActivityAndNotification?: RecentActivityAndNotification )  {
        let properties = [ "isNotification", "isSeen", "notificationStatus", "recentActivityAndNotificationId", "recentActivityAndNotificationName", "templateModuleId", "templateModuleName", "updatedBy", "updatedOn", "uRL", "projectId", "projectModuleId", "userId",];
        for (let property of properties)
            if (recentActivityAndNotification && recentActivityAndNotification[property])
                this[property] = recentActivityAndNotification[property];
    }
 
	isNotification : boolean = false ;
 
	isSeen : boolean = false ;
 
	notificationStatus : boolean = false ;
 
	recentActivityAndNotificationId : number =   0 ;
 
    @required()
    @maxLength(1000)
	recentActivityAndNotificationName : string =   undefined;
 
    @range(1,2147483647)
	templateModuleId : number =   undefined;
 
    @maxLength(500)
	templateModuleName : string =   undefined;
 
	updatedBy : number =   undefined;
 
	updatedOn : Date =   undefined;
 
    @required()
    @maxLength(1000)
	uRL : string =   undefined;
 
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
