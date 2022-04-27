import {ComponentContainer} from "@rx/core"
import { LiteTheirTeamMemberListComponent } from './list/lite-their-team-member-list.component'
import { LiteTheirTeamMemberAddComponent } from './add/lite-their-team-member-add.component'
import { LiteTheirTeamMemberEditComponent } from './edit/lite-their-team-member-edit.component'

export const LITE_THEIR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: LiteTheirTeamMemberListComponent,
    accessItem: 'list',
    applicationModuleId: 6137,
	keyName: 'liteTheirTeamMemberId',
	childModuleName : 'litetheirteammembers',
	rootModuleId:33
	},
	{
    component: LiteTheirTeamMemberAddComponent,
    accessItem: 'add',
    applicationModuleId: 6137,
	keyName: 'liteTheirTeamMemberId',
	childModuleName : 'litetheirteammembers',
	rootModuleId:33
	},
	{
    component: LiteTheirTeamMemberEditComponent,
    accessItem: 'edit',
    applicationModuleId: 6137,
	keyName: 'liteTheirTeamMemberId',
	childModuleName : 'litetheirteammembers',
	rootModuleId:33
	},
];

