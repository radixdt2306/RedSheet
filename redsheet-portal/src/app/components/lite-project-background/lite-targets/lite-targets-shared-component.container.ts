import {ComponentContainer} from "@rx/core"
import { LiteTargetListComponent } from './list/lite-target-list.component'

export const LITE_TARGETS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: LiteTargetListComponent,
    accessItem: 'list',
    applicationModuleId: 6137,
	keyName: 'liteTargetId',
	childModuleName : 'litetargets',
	rootModuleId:33
	},
];

