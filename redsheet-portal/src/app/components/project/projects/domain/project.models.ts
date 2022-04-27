import {
	vProjectRecord,
	Project,
	vUserLookup,
	vTemplateGroup
} from 'app/database-models';
import { ProjectModuleAssigneesOrReviewer } from 'app/database-models/project-module-assignees-or-reviewer';

export class ProjectLookupGroup {
	vProjectRecord : vProjectRecord;
	project : Project;
	userLookups:vUserLookup[];
	templateGroups : vTemplateGroup[];
	projectModuleAssigneesOrReviewerGroups: ProjectModuleAssigneesOrReviewer[];
}
