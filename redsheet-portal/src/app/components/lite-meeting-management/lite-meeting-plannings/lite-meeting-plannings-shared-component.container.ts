import {ComponentContainer} from "@rx/core"
import { LiteMeetingPlanningListComponent } from './list/lite-meeting-planning-list.component'

export const LITE_MEETING_PLANNINGS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: LiteMeetingPlanningListComponent,
    accessItem: 'list',
    applicationModuleId: 6140,
	keyName: 'liteMeetingPlanningId',
	childModuleName : 'litemeetingplannings',
	rootModuleId:33
	},
];

