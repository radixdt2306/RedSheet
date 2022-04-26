import {ComponentContainer} from "@rx/core"
import { ProjectCarryForwardListComponent } from './list/project-carry-forward-list.component'

export const PROJECT_CARRY_FORWARDS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: ProjectCarryForwardListComponent,
    accessItem: 'list',
    applicationModuleId: 5129,
	keyName: 'projectCarryForwardId',
	childModuleName : 'projectcarryforwards',
	rootModuleId:33
	},
];

