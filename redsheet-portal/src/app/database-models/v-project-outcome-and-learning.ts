import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectOutcomeAndLearning {
    constructor(vProjectOutcomeAndLearning?: vProjectOutcomeAndLearning )  {
        let properties = [ "outcomeAndLearningCategoryId", "projectModuleId", "projectOutcomeAndLearningId", "projectOutcomeAndLearningValue",];
        for (let property of properties)
            if (vProjectOutcomeAndLearning && vProjectOutcomeAndLearning[property])
                this[property] = vProjectOutcomeAndLearning[property];
    }
 
    @range(1,2147483647)
	outcomeAndLearningCategoryId : number =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectOutcomeAndLearningId : number =   undefined;
 
    @required()
    @maxLength(1000)
	projectOutcomeAndLearningValue : string =   undefined;


}
