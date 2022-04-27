import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectImplementationPlanRecord {
    constructor(vProjectImplementationPlanRecord?: vProjectImplementationPlanRecord )  {
        let properties = [ "activity", "endDate", "isEvent", "name", "projectImplementationPlanId", "projectModuleId", "startDate",];
        for (let property of properties)
            if (vProjectImplementationPlanRecord && vProjectImplementationPlanRecord[property])
                this[property] = vProjectImplementationPlanRecord[property];
    }
 
    @maxLength(1000)
	activity : string =   undefined;
 
	endDate : Date =   undefined;
 
	isEvent : boolean = false ;
 
    @required()
    @maxLength(50)
	name : string =   undefined;
 
	projectImplementationPlanId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @required()
	startDate : Date =   undefined;


}
