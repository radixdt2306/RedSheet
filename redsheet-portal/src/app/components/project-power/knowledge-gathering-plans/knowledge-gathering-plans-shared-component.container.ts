import {ComponentContainer} from "@rx/core"
import { KnowledgeGatheringPlanListComponent } from './list/knowledge-gathering-plan-list.component'
import { KnowledgeGatheringPlanAddComponent } from './add/knowledge-gathering-plan-add.component'
import { KnowledgeGatheringPlanEditComponent } from './edit/knowledge-gathering-plan-edit.component'

export const KNOWLEDGE_GATHERING_PLANS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: KnowledgeGatheringPlanListComponent,
    accessItem: 'list',
    applicationModuleId: 5090,
	keyName: 'knowledgeGatheringPlanId',
	childModuleName : 'knowledgegatheringplans',
	rootModuleId:33
	},
	{
    component: KnowledgeGatheringPlanAddComponent,
    accessItem: 'add',
    applicationModuleId: 5090,
	keyName: 'knowledgeGatheringPlanId',
	childModuleName : 'knowledgegatheringplans',
	rootModuleId:33
	},
	{
    component: KnowledgeGatheringPlanEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5090,
	keyName: 'knowledgeGatheringPlanId',
	childModuleName : 'knowledgegatheringplans',
	rootModuleId:33
	},
];

