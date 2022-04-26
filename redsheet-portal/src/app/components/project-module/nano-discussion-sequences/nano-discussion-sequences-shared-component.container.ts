import {ComponentContainer} from "@rx/core"
import { NanoDiscussionSequenceListComponent } from './list/nano-discussion-sequence-list.component'
import { NanoDiscussionSequenceAddComponent } from './add/nano-discussion-sequence-add.component'
import { NanoDiscussionSequenceEditComponent } from './edit/nano-discussion-sequence-edit.component'

export const NANO_DISCUSSION_SEQUENCES_SHARED_COMPONENT_CONTAINER: ComponentContainer[] = [
	{
    component: NanoDiscussionSequenceListComponent,
    accessItem: 'list',
    applicationModuleId: 6148,
	keyName: 'nanoDiscussionSequenceId',
	childModuleName : 'nanodiscussionsequences',
	rootModuleId:33
	},
	{
    component: NanoDiscussionSequenceAddComponent,
    accessItem: 'add',
    applicationModuleId: 6148,
	keyName: 'nanoDiscussionSequenceId',
	childModuleName : 'nanodiscussionsequences',
	rootModuleId:33
	},
	{
    component: NanoDiscussionSequenceEditComponent,
    accessItem: 'edit',
    applicationModuleId: 6148,
	keyName: 'nanoDiscussionSequenceId',
	childModuleName : 'nanodiscussionsequences',
	rootModuleId:33
	},
];

