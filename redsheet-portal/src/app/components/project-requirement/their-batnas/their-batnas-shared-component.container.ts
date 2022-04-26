import {ComponentContainer} from "@rx/core"
import { TheirBatnaListComponent } from './list/their-batna-list.component'

export const THEIR_BATNAS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: TheirBatnaListComponent,
    accessItem: 'list',
    applicationModuleId: 5093,
	keyName: 'theirBatnaId',
	childModuleName : 'theirbatnas',
	rootModuleId:33
	},
];

