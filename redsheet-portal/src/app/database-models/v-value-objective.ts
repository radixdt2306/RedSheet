import { required, maxLength, range, nested } from '@rx/annotations';

export class vValueObjective {
    constructor(vValueObjective?: vValueObjective )  {
        let properties = [ "className", "valueObjectiveId", "valueObjectiveName",];
        for (let property of properties)
            if (vValueObjective && vValueObjective[property])
                this[property] = vValueObjective[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	valueObjectiveId : number =   0 ;
 
    @required()
    @maxLength(200)
	valueObjectiveName : string =   undefined;


}
