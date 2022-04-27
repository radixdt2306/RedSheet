import {ComponentContainer} from "@rx/core"
import { TheirTeamMemberListComponent } from './list/their-team-member-list.component'
import { TheirTeamMemberAddComponent } from './add/their-team-member-add.component'
import { TheirTeamMemberEditComponent } from './edit/their-team-member-edit.component'

export const THEIR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: TheirTeamMemberListComponent,
    accessItem: 'list',
    applicationModuleId: 5089,
	keyName: 'theirTeamMemberId',
	childModuleName : 'theirteammembers',
	rootModuleId:33
	},
	{
    component: TheirTeamMemberAddComponent,
    accessItem: 'add',
    applicationModuleId: 5089,
	keyName: 'theirTeamMemberId',
	childModuleName : 'theirteammembers',
	rootModuleId:33
	},
	{
    component: TheirTeamMemberEditComponent,
    accessItem: 'edit',
    applicationModuleId: 5089,
	keyName: 'theirTeamMemberId',
	childModuleName : 'theirteammembers',
	rootModuleId:33
	},
];

