import {ComponentContainer} from "@rx/core"
import { OurRequirementDetailListComponent } from './list/our-requirement-detail-list.component'
import { OurRequirementDetailAddComponent } from './add/our-requirement-detail-add.component'
import { OurRequirementDetailEditComponent } from './edit/our-requirement-detail-edit.component'

export const OUR_REQUIREMENT_DETAILS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: OurRequirementDetailListComponent,
    accessItem: 'list',
    applicationModuleId: 5092,
	keyName: 'ourRequirementDetailId',
	childModuleName : 'ourrequirementdetails',
	rootModuleId:33
	},
	{
    component: OurRequirementDetailAddComponent,
    accessItem: 'add',
    applicationModuleId: 5092,
	keyName: 'ourRequirementDetailId',
	childModuleName : 'ourrequirementdetails',
	rootModuleId:33
	},
	{
    component: OurRequirementDetailEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5092,
	keyName: 'ourRequirementDetailId',
	childModuleName : 'ourrequirementdetails',
	rootModuleId:33
	},
];

