import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule,  vProjectModuleReviewRecord  } from './'
export class ProjectModuleReview {
    constructor(projectModuleReview?: ProjectModuleReview  | vProjectModuleReviewRecord )  {
        let properties = [ "feedback", "projectModuleReviewId", "projectModuleId",];
        for (let property of properties)
            if (projectModuleReview && projectModuleReview[property])
                this[property] = projectModuleReview[property];
    }
 
    @required()
	feedback : string =   undefined;
 
	projectModuleReviewId : number =   0 ;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;


}
