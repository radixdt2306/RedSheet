// import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
// import {Routes, RouterModule } from '@angular/router';
// import {CommonModule } from '@angular/common';
// import {FormsModule, ReactiveFormsModule } from "@angular/forms";
// import {RxViewModule } from '@rx/view';
// import {RxFormsModule } from '@rx/forms';
// import {RxTableModule } from "@rx/table";
// import { DynamicComponentContainer } from '@rx/core';
// import { PROJECT_SHARED_COMPONENT_CONTAINER } from 'app/components/project/project-shared.component.container';
// import { ProjectsService } from 'app/components/project/projects/projects.service';
// import { TemplateModuleEditComponent } from 'app/components/project/template-modules/edit/template-module.component';

// @NgModule({
//     imports: [
//         RxViewModule, RxFormsModule,
//         CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
//     ],
//     declarations: [TemplateModuleEditComponent],
//     providers: [ProjectsService],
//     exports: [RouterModule, TemplateModuleEditComponent ],
//     schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class ProjectSharedComponentModule { }
// DynamicComponentContainer.register(PROJECT_SHARED_COMPONENT_CONTAINER );