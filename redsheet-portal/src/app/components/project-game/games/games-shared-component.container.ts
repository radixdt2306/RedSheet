import {ComponentContainer} from "@rx/core"
import { GameListComponent } from './list/game-list.component'

export const GAMES_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: GameListComponent,
    accessItem: 'list',
    applicationModuleId: 5091,
	keyName: 'gameId',
	childModuleName : 'games',
	rootModuleId:33
	},
];

