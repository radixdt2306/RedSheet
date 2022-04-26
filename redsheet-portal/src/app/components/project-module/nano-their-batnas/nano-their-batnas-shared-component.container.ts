import {ComponentContainer} from "@rx/core"
import { NanoTheirBatnaListComponent } from './list/nano-their-batna-list.component'

export const NANO_THEIR_BATNAS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: NanoTheirBatnaListComponent,
    accessItem: 'list',
    applicationModuleId: 6147,
	keyName: 'nanoTheirBatnaId',
	childModuleName : 'nanotheirbatnas',
	rootModuleId:33
	},
];

