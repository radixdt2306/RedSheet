import { range } from '@rx/annotations';
import { Project, User, } from './'
export class ProjectModuleAssigneesOrReviewer {
    constructor(projectModuleAssigneesOrReviewer?: ProjectModuleAssigneesOrReviewer) {
        let properties = ["ProjectModuleAssigneesOrReviewerId", "projectId", "userId", "ownerNote", "isAssignee", "isReviewer"];
        for (let property of properties)
            if (projectModuleAssigneesOrReviewer && projectModuleAssigneesOrReviewer[property])
                this[property] = projectModuleAssigneesOrReviewer[property];
    }

    projectModuleAssigneesOrReviewerId: number = 0;

    @range(0, 2147483647)
    projectId: number = undefined;
    project: Project;

    @range(0, 2147483647)
    userId: number = undefined;
    user: User;

    isAssignee: boolean = undefined;

    isReviewer: boolean = undefined;
}
