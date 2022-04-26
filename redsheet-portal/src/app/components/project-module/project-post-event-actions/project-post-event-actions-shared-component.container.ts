import {ComponentContainer} from "@rx/core"
import { ProjectPostEventActionListComponent } from './list/project-post-event-action-list.component'
import { ProjectPostEventActionAddComponent } from './add/project-post-event-action-add.component'
import { ProjectPostEventActionEditComponent } from './edit/project-post-event-action-edit.component'

export const PROJECT_POST_EVENT_ACTIONS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: ProjectPostEventActionListComponent,
    accessItem: 'list',
    applicationModuleId: 5131,
	keyName: 'projectPostEventActionId',
	childModuleName : 'projectposteventactions',
	rootModuleId:33
	},
	{
    component: ProjectPostEventActionAddComponent,
    accessItem: 'add',
    applicationModuleId: 5131,
	keyName: 'projectPostEventActionId',
	childModuleName : 'projectposteventactions',
	rootModuleId:33
	},
	{
    component: ProjectPostEventActionEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5131,
	keyName: 'projectPostEventActionId',
	childModuleName : 'projectposteventactions',
	rootModuleId:33
	},
];

