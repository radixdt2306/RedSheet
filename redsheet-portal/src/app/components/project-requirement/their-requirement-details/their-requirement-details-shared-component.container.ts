import {ComponentContainer} from "@rx/core"
import { TheirRequirementDetailListComponent } from './list/their-requirement-detail-list.component'
import { TheirRequirementDetailAddComponent } from './add/their-requirement-detail-add.component'
import { TheirRequirementDetailEditComponent } from './edit/their-requirement-detail-edit.component'

export const THEIR_REQUIREMENT_DETAILS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: TheirRequirementDetailListComponent,
    accessItem: 'list',
    applicationModuleId: 5093,
	keyName: 'theirRequirementDetailId',
	childModuleName : 'theirrequirementdetails',
	rootModuleId:33
	},
	{
    component: TheirRequirementDetailAddComponent,
    accessItem: 'add',
    applicationModuleId: 5093,
	keyName: 'theirRequirementDetailId',
	childModuleName : 'theirrequirementdetails',
	rootModuleId:33
	},
	{
    component: TheirRequirementDetailEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5093,
	keyName: 'theirRequirementDetailId',
	childModuleName : 'theirrequirementdetails',
	rootModuleId:33
	},
];

