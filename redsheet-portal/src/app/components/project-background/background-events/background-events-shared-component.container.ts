import {ComponentContainer} from "@rx/core"
import { BackgroundEventListComponent } from './list/background-event-list.component'
import { BackgroundEventAddComponent } from './add/background-event-add.component'
import { BackgroundEventEditComponent } from './edit/background-event-edit.component'

export const BACKGROUND_EVENTS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: BackgroundEventListComponent,
    accessItem: 'list',
    applicationModuleId: 5084,
	keyName: 'backgroundEventId',
	childModuleName : 'background-events',
	rootModuleId:33
	},
	{
    component: BackgroundEventAddComponent,
    accessItem: 'add',
    applicationModuleId: 5084,
	keyName: 'backgroundEventId',
	childModuleName : 'background-events',
	rootModuleId:33
	},
	{
    component: BackgroundEventEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5084,
	keyName: 'backgroundEventId',
	childModuleName : 'background-events',
	rootModuleId:33
	},
];

