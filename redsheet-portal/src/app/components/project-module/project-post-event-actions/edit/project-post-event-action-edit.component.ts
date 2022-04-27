import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectPostEventAction, vProjectPostEventAction, vProjectPostEventActionRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectPostEventActionsService } from '../project-post-event-actions.service';
import { ProjectPostEventActionDomain } from '../domain/project-post-event-action.domain';
import { ProjectPostEventActionLookupGroup } from '../domain/project-post-event-action.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './project-post-event-action-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class ProjectPostEventActionEditComponent extends ProjectPostEventActionDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectPostEventActionFormGroup: FormGroup;
    editSubscription: Subscription;
    listSubscription: Subscription;
    manualEntered: boolean = true;
    projectPostEventActionLookupGroup: ProjectPostEventActionLookupGroup;;
    @Input() projectPostEventActionId: number;
    @Input() projectModuleId: number;
    ourTeamMembers: any;

    validMessagePostEventActionDetail: ValidMessage;
    validMessagePostEventActionBy: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectPostEventActionsService: ProjectPostEventActionsService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.projectPostEventActionsService.getBy(this.projectModuleId, [this.projectPostEventActionId]).subscribe(
            (response: vProjectPostEventActionRecord) => {
                if (this.listSubscription)
                    this.listSubscription.unsubscribe();
                this.listSubscription = this.projectPostEventActionsService.search({ projectModuleId: this.projectModuleId }).subscribe(result => {
                    this.ourTeamMembers = result.Users;

                    this.projectPostEventActionLookupGroup = new ProjectPostEventActionLookupGroup();
                    this.projectPostEventActionLookupGroup.projectPostEventAction = new ProjectPostEventAction(response);
                    this.projectPostEventActionFormGroup = this.validation.getFormGroup(this.projectPostEventActionLookupGroup.projectPostEventAction);

                    this.validMessagePostEventActionDetail = new ValidMessage();
                    this.validMessagePostEventActionBy = new ValidMessage();

                    this.onSearchChangePostEventActionDetail(this.projectPostEventActionFormGroup.controls.postEventActionDetail.value,
                        this.projectPostEventActionFormGroup.controls.postEventActionDetail.value == '' ? true : false);
                    this.onSearchChangePostEventActionBy(this.projectPostEventActionFormGroup.controls.postEventActionBy.value,
                        this.projectPostEventActionFormGroup.controls.postEventActionBy.value == '' ? true : false);

                    this.showComponent = true;
                });
            });
    }


    editProjectPostEventAction(): void {
        let postEventActiondate = this.projectPostEventActionFormGroup.controls.postEventActionOn;
        let todayDate = new Date();
        let projectPostEventAction: ProjectPostEventAction = this.projectPostEventActionFormGroup.value;
        if (projectPostEventAction.postEventActionOn >= todayDate) {
            this.editSubscription = this.projectPostEventActionsService.put(this.projectModuleId, this.projectPostEventActionFormGroup.value).subscribe(t => {
                this.hideProjectPostEventActionEditComponent();
            },
                error => {
                    this.toast.show(error, { status: 'error' })
                })
        }
        else {
            this.toast.show("Post Event Action Date should be greater than today's date ", { status: 'error' })
        }
    }

    hideProjectPostEventActionEditComponent(): void {
        document.body.className = "";
        this.popup.hide(ProjectPostEventActionEditComponent);
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
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}