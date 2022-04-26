import {ComponentContainer} from "@rx/core"
import { ArrivalAndOpeningTacticListComponent } from './list/arrival-and-opening-tactic-list.component'

export const ARRIVAL_AND_OPENING_TACTICS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: ArrivalAndOpeningTacticListComponent,
    accessItem: 'list',
    applicationModuleId: 5096,
	keyName: 'arrivalAndOpeningTacticId',
	childModuleName : 'arrivalandopeningtactics',
	rootModuleId:33
	},
];

