import {ComponentContainer} from "@rx/core"
import { ProjectStakeholderAddComponent } from './add/project-stakeholder-add.component'
import { ProjectStakeholderEditComponent } from './edit/project-stakeholder-edit.component'

export const PROJECT_STAKEHOLDERS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
        component: ProjectStakeholderAddComponent,
        accessItem: 'add',
    applicationModuleId: 5085,
	keyName: 'projectStakeholderId',
	childModuleName : 'undefined',
	rootModuleId:33
	},
	{
    component: ProjectStakeholderEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5085,
	keyName: 'projectStakeholderId',
	childModuleName : 'undefined',
	rootModuleId:33
	},
];

