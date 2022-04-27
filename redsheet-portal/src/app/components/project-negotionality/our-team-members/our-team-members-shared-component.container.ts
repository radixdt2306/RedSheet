import {ComponentContainer} from "@rx/core"
import { OurTeamMemberListComponent } from './list/our-team-member-list.component'
import { OurTeamMemberAddComponent } from './add/our-team-member-add.component'
import { OurTeamMemberEditComponent } from './edit/our-team-member-edit.component'

export const OUR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: OurTeamMemberListComponent,
    accessItem: 'list',
    applicationModuleId: 5088,
	keyName: 'ourTeamMemberId',
	childModuleName : 'ourteammembers',
	rootModuleId:33
	},
	{
    component: OurTeamMemberAddComponent,
    accessItem: 'add',
    applicationModuleId: 5088,
	keyName: 'ourTeamMemberId',
	childModuleName : 'ourteammembers',
	rootModuleId:33
	},
	{
    component: OurTeamMemberEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5088,
	keyName: 'ourTeamMemberId',
	childModuleName : 'ourteammembers',
	rootModuleId:33
	},
];

