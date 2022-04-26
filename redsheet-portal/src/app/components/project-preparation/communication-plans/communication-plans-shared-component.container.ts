import {ComponentContainer} from "@rx/core"
import { CommunicationPlanListComponent } from './list/communication-plan-list.component'
import { CommunicationPlanAddComponent } from './add/communication-plan-add.component'
import { CommunicationPlanEditComponent } from './edit/communication-plan-edit.component'

export const COMMUNICATION_PLANS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: CommunicationPlanListComponent,
    accessItem: 'list',
    applicationModuleId: 5095,
	keyName: 'communicationPlanId',
	childModuleName : 'communicationplans',
	rootModuleId:33
	},
	{
    component: CommunicationPlanAddComponent,
    accessItem: 'add',
    applicationModuleId: 5095,
	keyName: 'communicationPlanId',
	childModuleName : 'communicationplans',
	rootModuleId:33
	},
	{
    component: CommunicationPlanEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5095,
	keyName: 'communicationPlanId',
	childModuleName : 'communicationplans',
	rootModuleId:33
	},
];

