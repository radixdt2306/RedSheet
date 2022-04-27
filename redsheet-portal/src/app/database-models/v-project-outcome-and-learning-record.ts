import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectOutcomeAndLearningRecord {
    constructor(vProjectOutcomeAndLearningRecord?: vProjectOutcomeAndLearningRecord )  {
        let properties = [ "outcomeAndLearningCategoryId", "projectModuleId", "projectOutcomeAndLearningId", "projectOutcomeAndLearningValue",];
        for (let property of properties)
            if (vProjectOutcomeAndLearningRecord && vProjectOutcomeAndLearningRecord[property])
                this[property] = vProjectOutcomeAndLearningRecord[property];
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
