import {ComponentContainer} from "@rx/core"
import { ProjectModuleReviewEditComponent } from './edit/project-module-review-edit.component'

export const PROJECT_MODULE_REVIEWS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: ProjectModuleReviewEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5155,
	keyName: 'projectModuleReviewId',
	childModuleName : 'projectmodulereviews',
	rootModuleId:33
	},
];

