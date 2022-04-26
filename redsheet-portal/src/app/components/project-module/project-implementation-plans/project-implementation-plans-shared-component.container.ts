import {ComponentContainer} from "@rx/core"
import { ProjectImplementationPlanListComponent } from './list/project-implementation-plan-list.component'
import { ProjectImplementationPlanAddComponent } from './add/project-implementation-plan-add.component'
import { ProjectImplementationPlanEditComponent } from './edit/project-implementation-plan-edit.component'

export const PROJECT_IMPLEMENTATION_PLANS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
        component: ProjectImplementationPlanListComponent,
        accessItem: 'list',
        applicationModuleId: 5130,
        keyName: 'projectImplementationPlanId',
        childModuleName: 'projectimplementationplans',
        rootModuleId: 33
    },
    {
        component: ProjectImplementationPlanAddComponent,
        accessItem: 'add',
        applicationModuleId: 5130,
        keyName: 'projectImplementationPlanId',
        childModuleName: 'projectimplementationplans',
        rootModuleId: 33
    },
    {
        component: ProjectImplementationPlanEditComponent,
        accessItem: 'edit',
        applicationModuleId: 5130,
        keyName: 'projectImplementationPlanId',
        childModuleName: 'projectimplementationplans',
        rootModuleId: 33
    },
];

