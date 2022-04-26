import {ComponentContainer} from "@rx/core"
import { NanoOurBatnaListComponent } from './list/nano-our-batna-list.component'

export const NANO_OUR_BATNAS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: NanoOurBatnaListComponent,
    accessItem: 'list',
    applicationModuleId: 6146,
	keyName: 'nanoOurBatnaId',
	childModuleName : 'nanoourbatnas',
	rootModuleId:33
	},
];

