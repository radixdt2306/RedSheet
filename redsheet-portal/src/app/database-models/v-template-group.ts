import { required, maxLength, range, nested } from '@rx/annotations';

export class vTemplateGroup {
    constructor(vTemplateGroup?: vTemplateGroup )  {
        let properties = [ "templateGroupId", "templateGroupName",];
        for (let property of properties)
            if (vTemplateGroup && vTemplateGroup[property])
                this[property] = vTemplateGroup[property];
    }
 
    @required()
	templateGroupId : string;
 
    @required()
    @maxLength(500)
	templateGroupName : string =   undefined;


}
