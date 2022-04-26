import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxPopup, TabModel } from '@rx/view';

import { LanguageContentMultilingualComponent } from "./../language-content-multilingual/language-content-multilingual.component";
import { MultilingualDomain } from "./domain/multilingual.domain";
import { ModuleContentMultilingualComponent } from "./../module-content-multilingual/module-content-multilingual.component";

@Component({
    templateUrl: './multilingual-list.component.html',
    entryComponents:[LanguageContentMultilingualComponent,ModuleContentMultilingualComponent]
})
export class MultilingualListComponent extends MultilingualDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    viewSubscription: Subscription;
    tabModels: TabModel[];
    constructor(
        private router: Router,
    ) { super();this.tabModels = new Array<TabModel>(); }

    ngOnInit(): void {       
       
        var tabModel = new TabModel();
        tabModel.title = "Language Content";
        tabModel.component = LanguageContentMultilingualComponent;
        tabModel.active = this.tabModels.length == 0;
        tabModel.autoSelection = true;
        this.tabModels.push(tabModel);

        var tabModel1 = new TabModel();
        tabModel1.title = "Module Content";
        tabModel1.component = ModuleContentMultilingualComponent;
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
