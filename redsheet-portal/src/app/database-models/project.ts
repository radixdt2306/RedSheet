import { required, maxLength, range, nested } from '@rx/annotations';
import { TemplateGroup, RecentActivityAndNotification, ProjectModule, vProjectRecord } from './'
import { ProjectModuleAssigneesOrReviewer } from './project-module-assignees-or-reviewer';

export class Project {
	constructor(project?: Project | vProjectRecord) {
		let properties = ["createdBy", "createdOn", "isAllowCustomization", "isClosed", "isStarted", "moduleIdReached", "noOfDays", "ownerId", "projectId", "projectName", "projectNote", "publishDate", "reporteeName", "status", "templateId", "templateName"
			, "updatedBy", "updatedOn", "negotiationRoleId", "templateGroupId", "recentActivityAndNotifications", "projectModules", "projectModuleAssigneesOrReviewers"];

		for (let property of properties)
			if (project && project[property])
				this[property] = project[property];
	}

	createdBy: number = undefined;

	createdOn: Date = undefined;

	isAllowCustomization: boolean = false;

	isClosed: boolean = false;

	isStarted: boolean = false;

	moduleIdReached: number = undefined;

	@range(1, 2147483647)
	noOfDays: number = undefined;

	@range(1, 2147483647)
	ownerId: number = undefined;

	projectId: number = 0;

	@required()
	@maxLength(200)
	projectName: string = undefined;

	@maxLength(1000)
	projectNote: string = undefined;

	publishDate: Date = undefined;

	@maxLength(200)
	reporteeName: string = undefined;

	status: boolean = false;

	@range(1, 2147483647)
	templateId: number = undefined;

	@required()
	@maxLength(200)
	templateName: string = undefined;

	updatedBy: number = undefined;

	updatedOn: Date = undefined;

	@range(0, 2147483647)
	negotiationRoleId: number = undefined;

	@required()
	templateGroupId: string = undefined;
	templateGroup: TemplateGroup;
	@nested(RecentActivityAndNotification)
	recentActivityAndNotifications: RecentActivityAndNotification[];

	@nested(ProjectModule)
	projectModules: ProjectModule[];

	@nested(ProjectModuleAssigneesOrReviewer)
	projectModuleAssigneesOrReviewers: ProjectModuleAssigneesOrReviewer[];

}
