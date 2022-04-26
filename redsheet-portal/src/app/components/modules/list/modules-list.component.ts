import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ModuleListDomain } from "app/components/modules/list/domain/modules-list.domain";
import { ModulesService } from "app/components/modules/modules.service";
import { ModuleMaster } from "app/database-models";


@Component({
    templateUrl: './modules-list.component.html'
})
export class ModulesListComponent extends ModuleListDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    listSubscription: Subscription;
    moduleList: ModuleMaster[];
    moduleMaster: ModuleMaster = new ModuleMaster();
    errorMessage: string = undefined;
    validationFailed: {
        [key: string]: any;
    }
    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private modulesService: ModulesService
    ) { super(); }

    ngOnInit(): void {
        this.modulesService.get().subscribe(moduleList => {
            this.moduleList = moduleList;
            this.showComponent = true;
        });
    }
    postModule(moduleMaster): void {
        this.validationFailed = {};
        moduleMaster.active = true
        this.listSubscription = this.modulesService.post(moduleMaster).subscribe(t => {
            this.listSubscription.unsubscribe();
            this.moduleList.push(t);
            this.moduleMaster = new ModuleMaster();
        }, error => {
            this.validationFailed = error;
            this.errorMessage = error;
            this.toast.show(error, { status: 'error' });
            this.moduleMaster = new ModuleMaster()
        });
    }
    putModule(moduleMaster): void {
        this.validationFailed = {};
        this.listSubscription = this.modulesService.put(moduleMaster).subscribe(t => {
            this.listSubscription.unsubscribe();
        }, error => {
            this.validationFailed = error;
            this.errorMessage = error;
            this.toast.show(error, { status: 'error' });
            this.ngOnInit()
        });
    }
    removeModule(moduleMaster): void{
        this.listSubscription = this.modulesService.delete(moduleMaster).subscribe(t => {
            this.listSubscription.unsubscribe();
            this.ngOnInit();
        }, error => {
            this.validationFailed = error;
            this.errorMessage = error;
            this.toast.show(error, { status: 'error' });
            this.ngOnInit();
        });
    }
    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
