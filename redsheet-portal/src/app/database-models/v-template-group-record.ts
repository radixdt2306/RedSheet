import { required, maxLength, range, nested } from '@rx/annotations';

export class vTemplateGroupRecord {
    constructor(vTemplateGroupRecord?: vTemplateGroupRecord )  {
        let properties = [ "templateGroupId", "templateGroupName",];
        for (let property of properties)
            if (vTemplateGroupRecord && vTemplateGroupRecord[property])
                this[property] = vTemplateGroupRecord[property];
    }
 
    @required()
	templateGroupId : string;
 
    @required()
    @maxLength(500)
	templateGroupName : string =   undefined;


}
