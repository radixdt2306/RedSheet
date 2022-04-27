import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { CommunicationPlan, vCommunicationPlan, vCommunicationPlanRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { CommunicationPlansService } from '../communication-plans.service';
import { CommunicationPlanDomain } from '../domain/communication-plan.domain';
import { CommunicationPlanLookupGroup } from '../domain/communication-plan.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './communication-plan-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class CommunicationPlanEditComponent extends CommunicationPlanDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    communicationPlanFormGroup: FormGroup;
    editSubscription: Subscription;
    communicationPlanLookupGroup: CommunicationPlanLookupGroup;;
    @Input() communicationPlanId: number;
    @Input() projectPreparationId: number;

    validMessageMessage: ValidMessage;
    validMessageTo: ValidMessage;
    validMessageMediaMeans: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private communicationPlansService: CommunicationPlansService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.communicationPlansService.getBy(this.projectPreparationId, [this.communicationPlanId]).subscribe(
            (response: vCommunicationPlanRecord) => {
                this.communicationPlanLookupGroup = new CommunicationPlanLookupGroup();
                this.communicationPlanLookupGroup.communicationPlan = new CommunicationPlan(response);
                this.communicationPlanFormGroup = this.validation.getFormGroup(this.communicationPlanLookupGroup.communicationPlan);

                this.validMessageMessage = new ValidMessage();
                this.validMessageTo = new ValidMessage();
                this.validMessageMediaMeans = new ValidMessage();

                this.onSearchChangeMessage(this.communicationPlanFormGroup.controls.message.value,
                    this.communicationPlanFormGroup.controls.message.value == '' ? true : false);
                this.onSearchChangeTo(this.communicationPlanFormGroup.controls.to.value,
                    this.communicationPlanFormGroup.controls.to.value == '' ? true : false);
                this.onSearchChangeMediaMeans(this.communicationPlanFormGroup.controls.mediaMeans.value,
                    this.communicationPlanFormGroup.controls.mediaMeans.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    editCommunicationPlan(): void {
        this.editSubscription = this.communicationPlansService.put(this.projectPreparationId, this.communicationPlanFormGroup.value).subscribe(t => {
            this.hideCommunicationPlan();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    hideCommunicationPlan(): void {
        document.body.className = "";
        this.popup.hide(CommunicationPlanEditComponent);
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
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}