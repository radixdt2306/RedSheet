import {ComponentContainer} from "@rx/core"
import { LiteMeetingManagementTimingListComponent } from './list/lite-meeting-management-timing-list.component'
import { LiteMeetingManagementTimingAddComponent } from './add/lite-meeting-management-timing-add.component'
import { LiteMeetingManagementTimingEditComponent } from './edit/lite-meeting-management-timing-edit.component'

export const LITE_MEETING_MANAGEMENT_TIMINGS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: LiteMeetingManagementTimingListComponent,
    accessItem: 'list',
    applicationModuleId: 6140,
	keyName: 'liteMeetingManagementTimingId',
	childModuleName : 'litemeetingmanagementtimings',
	rootModuleId:33
	},
	{
    component: LiteMeetingManagementTimingAddComponent,
    accessItem: 'add',
    applicationModuleId: 6140,
	keyName: 'liteMeetingManagementTimingId',
	childModuleName : 'litemeetingmanagementtimings',
	rootModuleId:33
	},
	{
    component: LiteMeetingManagementTimingEditComponent,
    accessItem: 'edit',
    applicationModuleId: 6140,
	keyName: 'liteMeetingManagementTimingId',
	childModuleName : 'litemeetingmanagementtimings',
	rootModuleId:33
	},
];

