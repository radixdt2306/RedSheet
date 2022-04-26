import { vUser } from "app/database-models";
import { vProjectModuleAssignee } from "app/database-models/v-project-module-assignee";


export class TemplateModuleLookupGroup {
    users : vUser;
	projectModuleAssignees : vProjectModuleAssignee;
	//projectModuleReviewers :vProjectModuleReviewers[];
}
