import {ComponentContainer} from "@rx/core"
import { PowerTypeDetailListComponent } from './list/power-type-detail-list.component'

export const POWER_TYPE_DETAILS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: PowerTypeDetailListComponent,
    accessItem: 'list',
    applicationModuleId: 5090,
	keyName: 'powerTypeDetailId',
	childModuleName : 'powertypedetails',
	rootModuleId:33
	},
];

