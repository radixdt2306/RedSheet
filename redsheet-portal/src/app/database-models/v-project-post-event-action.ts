import { required, maxLength, range, nested } from '@rx/annotations';

export class vProjectPostEventAction {
    constructor(vProjectPostEventAction?: vProjectPostEventAction )  {
        let properties = [ "postEventActionBy", "postEventActionDetail", "postEventActionOn", "projectModuleId", "projectPostEventActionId",];
        for (let property of properties)
            if (vProjectPostEventAction && vProjectPostEventAction[property])
                this[property] = vProjectPostEventAction[property];
    }
 
    @required()
    @maxLength(1000)
	postEventActionBy : string =   undefined;
 
    @required()
    @maxLength(1000)
	postEventActionDetail : string =   undefined;
 
    @required()
	postEventActionOn : Date =   undefined;
 
	projectModuleId : number =   0 ;
 
    @range(1,2147483647)
	projectPostEventActionId : number =   undefined;


}
