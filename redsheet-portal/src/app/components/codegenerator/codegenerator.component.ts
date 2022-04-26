import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxPopup, TabModel } from '@rx/view';

import { CodeGeneratorDomain } from "./domain/codegenerator.domain";
import { GeneratorModelsComponent } from "app/components/generator-models/generator-models.component";
import { GeneratorControllerComponent } from "app/components/generator-controller/generator-controller.component";

@Component({
    templateUrl: './codegenerator.component.html',
    entryComponents:[GeneratorModelsComponent,GeneratorControllerComponent]
})
export class CodeGeneratorComponent extends CodeGeneratorDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    viewSubscription: Subscription;
    tabModels: TabModel[];
    constructor(
        private router: Router,
    ) { super();this.tabModels = new Array<TabModel>(); }

    ngOnInit(): void {       
       
        var tabModel = new TabModel();
        tabModel.title = "Controller";
        tabModel.component = GeneratorControllerComponent;
        tabModel.active = this.tabModels.length == 0;
        tabModel.autoSelection = true;
        this.tabModels.push(tabModel);

        var tabModel1 = new TabModel();
        tabModel1.title = "Models";
        tabModel1.component = GeneratorModelsComponent;
        tabModel1.active = this.tabModels.length == 0;
        tabModel1.autoSelection = true;
        this.tabModels.push(tabModel1);

        this.showComponent = true;
   
    }
   
    ngOnDestroy(): void {
            if (this.viewSubscription)       
            this.viewSubscription.unsubscribe();
        super.destroy();
    }
}
