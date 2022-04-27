import {ComponentContainer} from "@rx/core"
import { EventAgendaTimingListComponent } from './list/event-agenda-timing-list.component'
import { EventAgendaTimingAddComponent } from './add/event-agenda-timing-add.component'
import { EventAgendaTimingEditComponent } from './edit/event-agenda-timing-edit.component'

export const EVENT_AGENDA_TIMINGS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: EventAgendaTimingListComponent,
    accessItem: 'list',
    applicationModuleId: 5096,
	keyName: 'eventAgendaTimingId',
	childModuleName : 'eventagendatimings',
	rootModuleId:33
	},
	{
    component: EventAgendaTimingAddComponent,
    accessItem: 'add',
    applicationModuleId: 5096,
	keyName: 'eventAgendaTimingId',
	childModuleName : 'eventagendatimings',
	rootModuleId:33
	},
	{
    component: EventAgendaTimingEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5096,
	keyName: 'eventAgendaTimingId',
	childModuleName : 'eventagendatimings',
	rootModuleId:33
	},
];

