import {ComponentContainer} from "@rx/core"
import { ProjectZomaAddComponent } from './add/project-zoma-add.component'

export const PROJECT_ZOMAS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: ProjectZomaAddComponent,
    accessItem: 'add',
    applicationModuleId: 5123,
	keyName: 'projectZomaId',
	childModuleName : 'projectzomas',
	rootModuleId:33
	},
];

