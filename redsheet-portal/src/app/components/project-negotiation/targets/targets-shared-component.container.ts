import {ComponentContainer} from "@rx/core"
import { TargetListComponent } from './list/target-list.component'

export const TARGETS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: TargetListComponent,
    accessItem: 'list',
    applicationModuleId: 5089,
	keyName: 'targetId',
	childModuleName : 'targets',
	rootModuleId:33
	},
];

