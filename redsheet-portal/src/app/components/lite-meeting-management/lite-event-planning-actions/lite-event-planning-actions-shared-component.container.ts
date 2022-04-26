import {ComponentContainer} from "@rx/core"
import { LiteEventPlanningActionListComponent } from './list/lite-event-planning-action-list.component'
import { LiteEventPlanningActionAddComponent } from './add/lite-event-planning-action-add.component'
import { LiteEventPlanningActionEditComponent } from './edit/lite-event-planning-action-edit.component'

export const LITE_EVENT_PLANNING_ACTIONS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: LiteEventPlanningActionListComponent,
    accessItem: 'list',
    applicationModuleId: 6140,
	keyName: 'liteEventPlanningActionId',
	childModuleName : 'liteeventplanningactions',
	rootModuleId:33
	},
	{
    component: LiteEventPlanningActionAddComponent,
    accessItem: 'add',
    applicationModuleId: 6140,
	keyName: 'liteEventPlanningActionId',
	childModuleName : 'liteeventplanningactions',
	rootModuleId:33
	},
	{
    component: LiteEventPlanningActionEditComponent,
    accessItem: 'edit',
    applicationModuleId: 6140,
	keyName: 'liteEventPlanningActionId',
	childModuleName : 'liteeventplanningactions',
	rootModuleId:33
	},
];

