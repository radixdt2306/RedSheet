import {ComponentContainer} from "@rx/core"
import { OurbatnaListComponent } from './list/ourbatna-list.component'

export const OURBATNAS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: OurbatnaListComponent,
    accessItem: 'list',
    applicationModuleId: 5092,
	keyName: 'ourbatnaId',
	childModuleName : 'ourbatnas',
	rootModuleId:33
	},
];

