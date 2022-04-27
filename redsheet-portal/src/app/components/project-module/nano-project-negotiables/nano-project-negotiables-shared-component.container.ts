import {ComponentContainer} from "@rx/core"
import { NanoProjectNegotiableListComponent } from './list/nano-project-negotiable-list.component'
import { NanoProjectNegotiableAddComponent } from './add/nano-project-negotiable-add.component'
import { NanoProjectNegotiableEditComponent } from './edit/nano-project-negotiable-edit.component'

export const NANO_PROJECT_NEGOTIABLES_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: NanoProjectNegotiableListComponent,
    accessItem: 'list',
    applicationModuleId: 6145,
	keyName: 'nanoProjectNegotiableId',
	childModuleName : 'nanoprojectnegotiables',
	rootModuleId:33
	},
	{
    component: NanoProjectNegotiableAddComponent,
    accessItem: 'add',
    applicationModuleId: 6145,
	keyName: 'nanoProjectNegotiableId',
	childModuleName : 'nanoprojectnegotiables',
	rootModuleId:33
	},
	{
    component: NanoProjectNegotiableEditComponent,
    accessItem: 'edit',
    applicationModuleId: 6145,
	keyName: 'nanoProjectNegotiableId',
	childModuleName : 'nanoprojectnegotiables',
	rootModuleId:33
	},
];

