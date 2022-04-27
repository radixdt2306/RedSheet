import { required, maxLength, range, nested } from '@rx/annotations';
import { ModuleMaster, EmailTemplateDetail, RolePermission, ModuleContent,  } from './'
export class ApplicationModule {
    constructor(applicationModule?: ApplicationModule )  {
        let properties = [ "applicationModuleId", "parentApplicationModuleId", "visibleActionItem", "moduleMasterId", "emailTemplateDetails", "rolePermissions", "moduleContents",];
        for (let property of properties)
            if (applicationModule && applicationModule[property])
                this[property] = applicationModule[property];
    }
 
	applicationModuleId : number =   0 ;
 
	parentApplicationModuleId : number =   undefined;
 
    @required()
    @maxLength(1)
	visibleActionItem : string =   undefined;
 
    @range(0,2147483647)
	moduleMasterId : number =   undefined;
	moduleMaster : ModuleMaster  ;
	@nested(EmailTemplateDetail)
	emailTemplateDetails: EmailTemplateDetail[];

	@nested(RolePermission)
	rolePermissions: RolePermission[];

	@nested(ModuleContent)
	moduleContents: ModuleContent[];



}
