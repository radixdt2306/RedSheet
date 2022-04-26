import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule,  vProjectCarryForwardRecord  } from './'
export class ProjectCarryForward {
    constructor(projectCarryForward?: ProjectCarryForward  | vProjectCarryForwardRecord )  {
        let properties = [ "carryForwardValue", "projectCarryForwardId", "projectModuleId",];
        for (let property of properties)
            if (projectCarryForward && projectCarryForward[property])
                this[property] = projectCarryForward[property];
    }
 
    @required()
    @maxLength(350)
	carryForwardValue : string =   undefined;
 
	projectCarryForwardId : number =   0 ;
 
    @range(0,2147483647)
	projectModuleId : number =   undefined;
	projectModule : ProjectModule  ;


}
