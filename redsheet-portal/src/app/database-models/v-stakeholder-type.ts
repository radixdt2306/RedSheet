import { required, maxLength, range, nested } from '@rx/annotations';

export class vStakeholderType {
    constructor(vStakeholderType?: vStakeholderType )  {
        let properties = [ "actionRequried", "className", "stakeholderTypeId", "stakeholderTypeName",];
        for (let property of properties)
            if (vStakeholderType && vStakeholderType[property])
                this[property] = vStakeholderType[property];
    }
 
    @required()
    @maxLength(200)
	actionRequried : string =   undefined;
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	stakeholderTypeId : number =   0 ;
 
    @required()
    @maxLength(200)
	stakeholderTypeName : string =   undefined;


}
