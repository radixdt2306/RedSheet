import {ComponentContainer} from "@rx/core"
import { EventPlanningActionListComponent } from './list/event-planning-action-list.component'
import { EventPlanningActionAddComponent } from './add/event-planning-action-add.component'
import { EventPlanningActionEditComponent } from './edit/event-planning-action-edit.component'

export const EVENT_PLANNING_ACTIONS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: EventPlanningActionListComponent,
    accessItem: 'list',
    applicationModuleId: 5095,
	keyName: 'eventPlanningActionId',
	childModuleName : 'eventplanningactions',
	rootModuleId:33
	},
	{
    component: EventPlanningActionAddComponent,
    accessItem: 'add',
    applicationModuleId: 5095,
	keyName: 'eventPlanningActionId',
	childModuleName : 'eventplanningactions',
	rootModuleId:33
	},
	{
    component: EventPlanningActionEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5095,
	keyName: 'eventPlanningActionId',
	childModuleName : 'eventplanningactions',
	rootModuleId:33
	},
];

