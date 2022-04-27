import {ComponentContainer} from "@rx/core"
import { NanoOurObjectiveListComponent } from './list/nano-our-objective-list.component'

export const NANO_OUR_OBJECTIVES_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: NanoOurObjectiveListComponent,
    accessItem: 'list',
    applicationModuleId: 6143,
	keyName: 'nanoOurObjectiveId',
	childModuleName : 'nanoourobjectives',
	rootModuleId:33
	},
];

