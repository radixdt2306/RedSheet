import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";

import {RxFormsModule} from "@rx/forms";
import {RxViewModule} from "@rx/view";
import {    RxTableModule} from "@rx/table";

import { NanoScopeToNegotiateObjectiveEditComponent } from './nano-scope-to-negotiate-objective-edit.component'
import { NANO_SCOPE_TO_NEGOTIATE_OBJECTIVE_EDIT_ROUTING } from './nano-scope-to-negotiate-objective-edit.routing'
import {NanoScopeToNegotiateObjectivesService } from "../nano-scope-to-negotiate-objectives.service";
import { NanoOurObjectivesSharedComponentModule } from 'app/components/nano-scope-to-negotiate-objective/nano-our-objectives/nano-our-objectives-shared-component.module'
import { ProjectModulesSharedComponentModule } from 'app/components/project-module/project-modules/project-modules-shared-component.module'

@NgModule({
    imports: [
        NANO_SCOPE_TO_NEGOTIATE_OBJECTIVE_EDIT_ROUTING ,
        CommonModule, RxViewModule, RxTableModule, RxFormsModule, FormsModule, ReactiveFormsModule,
		NanoOurObjectivesSharedComponentModule, ProjectModulesSharedComponentModule,     ],
    declarations: [NanoScopeToNegotiateObjectiveEditComponent ],
    exports: [RouterModule],
    providers: [NanoScopeToNegotiateObjectivesService]
})
export class NanoScopeToNegotiateObjectiveEditModule { }