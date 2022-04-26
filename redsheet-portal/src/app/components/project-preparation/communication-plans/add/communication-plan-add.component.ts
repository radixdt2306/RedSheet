import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { CommunicationPlan, } from 'app/database-models';

import { } from 'app/lookups';
import { CommunicationPlansService } from '../communication-plans.service';
import { CommunicationPlanDomain } from '../domain/communication-plan.domain';
import { CommunicationPlanLookupGroup } from '../domain/communication-plan.models';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './communication-plan-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class CommunicationPlanAddComponent extends CommunicationPlanDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    communicationPlanFormGroup: FormGroup;
    addSubscription: Subscription;
    communicationPlanLookupGroup: CommunicationPlanLookupGroup;;
    @Input() projectPreparationId: number;

    validMessageMessage: ValidMessage;
    validMessageTo: ValidMessage;
    validMessageMediaMeans: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private popup: RxPopup,
        private communicationPlansService: CommunicationPlansService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.communicationPlanLookupGroup = new CommunicationPlanLookupGroup();
        this.communicationPlanLookupGroup.communicationPlan = new CommunicationPlan();
        this.communicationPlanFormGroup = this.validation.getFormGroup(this.communicationPlanLookupGroup.communicationPlan);
        this.communicationPlanFormGroup.controls.projectPreparationId.setValue(this.projectPreparationId);

        this.validMessageMessage = new ValidMessage();
        this.validMessageTo = new ValidMessage();
        this.validMessageMediaMeans = new ValidMessage();

        this.onSearchChangeMessage('', true);
        this.onSearchChangeTo('', true);
        this.onSearchChangeMediaMeans('', true);

        this.showComponent = true;
    }

    addCommunicationPlan(): void {
        this.addSubscription = this.communicationPlansService.post(this.projectPreparationId, this.communicationPlanFormGroup.value).subscribe(t => {
            this.hideCommunicationPlan();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    hideCommunicationPlan(): void {
        document.body.className = "";
        this.popup.hide(CommunicationPlanAddComponent);
    }

    onSearchChangeMessage(value, isFirstTime: boolean = false) {
        
        this.validMessageMessage = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeTo(value, isFirstTime: boolean = false) {
        
        this.validMessageTo = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    onSearchChangeMediaMeans(value, isFirstTime: boolean = false) {
        
        this.validMessageMediaMeans = ValidMessage.onSearchChangesCommon(value, 100, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.communicationPlanFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}