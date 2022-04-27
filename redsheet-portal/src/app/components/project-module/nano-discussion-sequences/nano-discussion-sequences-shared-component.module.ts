import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import {DynamicComponentContainer } from '@rx/core';

import { NanoDiscussionSequenceListComponent } from './list/nano-discussion-sequence-list.component'
import { NanoDiscussionSequenceAddComponent } from './add/nano-discussion-sequence-add.component'
import { NanoDiscussionSequenceEditComponent } from './edit/nano-discussion-sequence-edit.component'
import {NanoDiscussionSequencesService } from "./nano-discussion-sequences.service";
import {NANO_DISCUSSION_SEQUENCES_SHARED_COMPONENT_CONTAINER } from './nano-discussion-sequences-shared-component.container';
@NgModule({
    imports: [
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [ NanoDiscussionSequenceListComponent,  NanoDiscussionSequenceAddComponent,  NanoDiscussionSequenceEditComponent, ],
    providers: [NanoDiscussionSequencesService ],
    exports: [RouterModule, NanoDiscussionSequenceListComponent,  NanoDiscussionSequenceAddComponent,  NanoDiscussionSequenceEditComponent, ]
})
export class NanoDiscussionSequencesSharedComponentModule { }
DynamicComponentContainer.register(NANO_DISCUSSION_SEQUENCES_SHARED_COMPONENT_CONTAINER );