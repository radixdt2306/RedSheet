import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, User,  } from './'
export class ProjectModuleReviewer {
    constructor(projectModuleReviewer?: ProjectModuleReviewer )  {
        let properties = [ "projectModuleReviewerId", "projectModuleId", "userId", "isChecked",];
        for (let property of properties)
            if (projectModuleReviewer && projectModuleReviewer[property])
                this[property] = projectModuleReviewer[property];
    }
 
	projectModuleReviewerId : number =   0 ;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;
 
    @range(0,2147483647)
	userId : number =   undefined;
	user : User  ;

	isChecked :  boolean=   undefined;

}
