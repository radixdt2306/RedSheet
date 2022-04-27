import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule,  vProjectOutcomeAndLearningRecord  } from './'
export class ProjectOutcomeAndLearning {
    constructor(projectOutcomeAndLearning?: ProjectOutcomeAndLearning  | vProjectOutcomeAndLearningRecord )  {
        let properties = [ "projectOutcomeAndLearningId", "projectOutcomeAndLearningValue", "outcomeAndLearningCategoryId", "projectModuleId",];
        for (let property of properties)
            if (projectOutcomeAndLearning && projectOutcomeAndLearning[property])
                this[property] = projectOutcomeAndLearning[property];
    }
 
	projectOutcomeAndLearningId : number =   0 ;
 
    @required()
    @maxLength(400)
	projectOutcomeAndLearningValue : string =   undefined;
 
    @range(0,2147483647)
	outcomeAndLearningCategoryId : number =   undefined;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;


}
