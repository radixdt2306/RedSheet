import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RxViewModule } from '@rx/view';
import {RxFormsModule } from '@rx/forms';
import {RxTableModule } from "@rx/table";
import { CodeGeneratorComponent } from './codegenerator.component'
import { CODEGENERATOR_ROUTING } from './codegenerator.routing'
import { GeneratorControllerComponent } from "app/components/generator-controller/generator-controller.component";
import { GeneratorModelsComponent } from "app/components/generator-models/generator-models.component";

@NgModule({
    imports: [
        CODEGENERATOR_ROUTING,
        RxViewModule, RxFormsModule,
        CommonModule, FormsModule, ReactiveFormsModule, RxTableModule
    ],
    declarations: [CodeGeneratorComponent, GeneratorControllerComponent,GeneratorModelsComponent ],
    providers: [],
    exports: [RouterModule]
})
export class CodeGeneratorModule { }
