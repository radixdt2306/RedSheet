import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectImplementationPlan {
    constructor(vProjectImplementationPlan?: vProjectImplementationPlan )  {
        let properties = [ "activity", "endDate", "isEvent", "name", "projectImplementationPlanId", "projectModuleId", "startDate",];
        for (let property of properties)
            if (vProjectImplementationPlan && vProjectImplementationPlan[property])
                this[property] = vProjectImplementationPlan[property];
    }
 
    @required()
    @maxLength(1000)
	activity : string =   undefined;
 
	endDate : Date =   undefined;
 
	isEvent : boolean = false ;
 
    @required()
    @maxLength(62)
	name : string =   undefined;
 
	projectImplementationPlanId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @required()
	startDate : Date =   undefined;


}
