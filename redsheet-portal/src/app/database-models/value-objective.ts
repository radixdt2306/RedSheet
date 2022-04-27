import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectBackground, NanoScopeToNegotiateObjective,  } from './'
export class ValueObjective {
    constructor(valueObjective?: ValueObjective )  {
        let properties = [ "className", "valueObjectiveId", "valueObjectiveName", "projectBackgrounds", "nanoScopeToNegotiateObjectives",];
        for (let property of properties)
            if (valueObjective && valueObjective[property])
                this[property] = valueObjective[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	valueObjectiveId : number =   0 ;
 
    @required()
    @maxLength(200)
	valueObjectiveName : string =   undefined;
	@nested(ProjectBackground)
	projectBackgrounds: ProjectBackground[];

	@nested(NanoScopeToNegotiateObjective)
	nanoScopeToNegotiateObjectives: NanoScopeToNegotiateObjective[];



}
