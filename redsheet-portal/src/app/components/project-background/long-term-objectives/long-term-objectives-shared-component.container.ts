import {ComponentContainer} from "@rx/core"
import { LongTermObjectiveListComponent } from './list/long-term-objective-list.component'

export const LONG_TERM_OBJECTIVES_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: LongTermObjectiveListComponent,
    accessItem: 'list',
    applicationModuleId: 5084,
	keyName: 'longTermObjectiveId',
	childModuleName : 'long-term-objectives',
	rootModuleId:33
	},
];

