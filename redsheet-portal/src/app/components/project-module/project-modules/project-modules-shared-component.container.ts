import {ComponentContainer} from "@rx/core"
import { ProjectModuleEditComponent } from './edit/project-module-edit.component'
import { ProjectModuleHelpDetailComponent } from "app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component";
import { ProjectImplementationPlanListComponent } from "app/components/project-module/project-implementation-plans/list/project-implementation-plan-list.component";

export const PROJECT_MODULES_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
        component: ProjectModuleEditComponent,
        accessItem: 'edit',
		applicationModuleId: 5099,
		keyName: 'projectModuleId',
		childModuleName : 'undefined',
		rootModuleId:33
	},
	// {
	// 	component: ProjectModuleHelpDetailComponent,
	// 	accessItem: 'add',
	// 	applicationModuleId: 5099,
	// 	keyName: 'projectModuleId',
	// 	childModuleName : 'undefined',
	// 	rootModuleId:33
	// 	},
];

