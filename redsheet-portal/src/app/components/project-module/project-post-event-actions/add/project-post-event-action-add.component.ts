import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectPostEventAction, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectPostEventActionsService } from '../project-post-event-actions.service';
import { ProjectPostEventActionDomain } from '../domain/project-post-event-action.domain';
import { ProjectPostEventActionLookupGroup } from '../domain/project-post-event-action.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './project-post-event-action-add.component.html',
    entryComponents: [RxMessageComponent]
})

export class ProjectPostEventActionAddComponent extends ProjectPostEventActionDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    projectPostEventActionFormGroup: FormGroup;
    addSubscription: Subscription;
    manualEntered: boolean = true;
    listSubscription: Subscription;
    projectPostEventActionLookupGroup: ProjectPostEventActionLookupGroup;;
    @Input() projectModuleId: number;
    ourTeamMembers: any;

    validMessagePostEventActionDetail: ValidMessage;
    validMessagePostEventActionBy: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private projectPostEventActionsService: ProjectPostEventActionsService,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.projectPostEventActionsService.search({ projectModuleId: this.projectModuleId }).subscribe(result => {
            this.ourTeamMembers = result.Users;
        });
        this.projectPostEventActionLookupGroup = new ProjectPostEventActionLookupGroup();
        this.projectPostEventActionLookupGroup.projectPostEventAction = new ProjectPostEventAction();
        this.projectPostEventActionFormGroup = this.validation.getFormGroup(this.projectPostEventActionLookupGroup.projectPostEventAction);
        this.projectPostEventActionFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

        this.validMessagePostEventActionDetail = new ValidMessage();
        this.validMessagePostEventActionBy = new ValidMessage();

        this.onSearchChangePostEventActionDetail('', true);
        this.onSearchChangePostEventActionBy('', true);

        this.showComponent = true;
    }

    addProjectPostEventAction(): void {
        let postEventActiondate = this.projectPostEventActionFormGroup.controls.postEventActionOn;
        let todayDate = new Date();
        let projectPostEventAction: ProjectPostEventAction = this.projectPostEventActionFormGroup.value;
        if (projectPostEventAction.postEventActionOn >= todayDate) {
            this.addSubscription = this.projectPostEventActionsService.post(this.projectModuleId, this.projectPostEventActionFormGroup.value).subscribe(t => {
                this.hideProjectPostEventActionAddComponent();
            },
                error => {
                    this.toast.show(error, { status: 'error' })
                })
        }
        else {
            this.toast.show("Post Event Action Date should be greater than today's date ", { status: 'error' })
        }
    }

    hideProjectPostEventActionAddComponent(): void {
        document.body.className = "";
        this.popup.hide(ProjectPostEventActionAddComponent);
    }

    onSearchChangePostEventActionDetail(value, isFirstTime: boolean = false) {
        
        this.validMessagePostEventActionDetail = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    onSearchChangePostEventActionBy(value, isFirstTime: boolean = false) {
        
        this.validMessagePostEventActionBy = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectPostEventActionFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}