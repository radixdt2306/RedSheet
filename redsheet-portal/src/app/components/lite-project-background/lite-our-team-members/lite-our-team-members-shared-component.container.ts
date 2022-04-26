import {ComponentContainer} from "@rx/core"
import { LiteOurTeamMemberListComponent } from './list/lite-our-team-member-list.component'
import { LiteOurTeamMemberAddComponent } from './add/lite-our-team-member-add.component'
import { LiteOurTeamMemberEditComponent } from './edit/lite-our-team-member-edit.component'

export const LITE_OUR_TEAM_MEMBERS_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: LiteOurTeamMemberListComponent,
    accessItem: 'list',
    applicationModuleId: 6137,
	keyName: 'liteOurTeamMemberId',
	childModuleName : 'liteourteammembers',
	rootModuleId:33
	},
	{
    component: LiteOurTeamMemberAddComponent,
    accessItem: 'add',
    applicationModuleId: 6137,
	keyName: 'liteOurTeamMemberId',
	childModuleName : 'liteourteammembers',
	rootModuleId:33
	},
	{
    component: LiteOurTeamMemberEditComponent,
    accessItem: 'edit',
    applicationModuleId: 6137,
	keyName: 'liteOurTeamMemberId',
	childModuleName : 'liteourteammembers',
	rootModuleId:33
	},
];

