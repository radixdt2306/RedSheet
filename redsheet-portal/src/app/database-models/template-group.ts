import { required, maxLength, range, nested } from '@rx/annotations';
import { Project,  vTemplateGroupRecord  } from './'
export class TemplateGroup {
    constructor(templateGroup?: TemplateGroup  | vTemplateGroupRecord )  {
        let properties = [ "templateGroupId", "templateGroupName", "projects",];
        for (let property of properties)
            if (templateGroup && templateGroup[property])
                this[property] = templateGroup[property];
    }
 
    @required()
	templateGroupId : string;
 
    @required()
    @maxLength(500)
	templateGroupName : string =   undefined;
	@nested(Project)
	projects: Project[];



}
