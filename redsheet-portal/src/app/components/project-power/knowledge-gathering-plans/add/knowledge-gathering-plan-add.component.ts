import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { KnowledgeGatheringPlan, } from 'app/database-models';

import { } from 'app/lookups';
import { KnowledgeGatheringPlansService } from '../knowledge-gathering-plans.service';
import { KnowledgeGatheringPlanDomain } from '../domain/knowledge-gathering-plan.domain';
import { KnowledgeGatheringPlanLookupGroup } from '../domain/knowledge-gathering-plan.models';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './knowledge-gathering-plan-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class KnowledgeGatheringPlanAddComponent extends KnowledgeGatheringPlanDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    knowledgeGatheringPlanFormGroup: FormGroup;
    addSubscription: Subscription;
    listSubscription: Subscription;
    manualEntered: boolean = true;
    knowledgeGatheringPlanLookupGroup: KnowledgeGatheringPlanLookupGroup;;
    @Input() projectPowerId: number;
    @Input() projectModuleId: number;
    ourTeamMembers: any;
    validMessageKnowledgeRequired: ValidMessage;
    validMessageSource: ValidMessage;
    validMessageKnowledgeGivenBy: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private popup: RxPopup,
        private knowledgeGatheringPlansService: KnowledgeGatheringPlansService,
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.knowledgeGatheringPlansService.search({ projectModuleId: this.projectModuleId }).subscribe(result => {

            this.ourTeamMembers = result.Users;
        });
        this.knowledgeGatheringPlanLookupGroup = new KnowledgeGatheringPlanLookupGroup();
        this.knowledgeGatheringPlanLookupGroup.knowledgeGatheringPlan = new KnowledgeGatheringPlan();
        this.knowledgeGatheringPlanFormGroup = this.validation.getFormGroup(this.knowledgeGatheringPlanLookupGroup.knowledgeGatheringPlan);
        this.knowledgeGatheringPlanFormGroup.controls.projectPowerId.setValue(this.projectPowerId);

        this.validMessageKnowledgeRequired = new ValidMessage();
        this.validMessageSource = new ValidMessage();
        this.validMessageKnowledgeGivenBy = new ValidMessage();

        this.onSearchChangeKnowledgeRequired('', true);
        this.onSearchChangeSource('', true);
        this.onSearchChangeKnowledgeGivenBy('', true);
        this.showComponent = true;
    }

    addKnowledgeGatheringPlan(): void {
        let knowledgeGatheringDate = this.knowledgeGatheringPlanFormGroup.controls.knowledgeGivenOn;
        let todayDate = new Date();
        let knowledgeGatheringPlan: KnowledgeGatheringPlan = this.knowledgeGatheringPlanFormGroup.value;
        if (knowledgeGatheringPlan.knowledgeGivenOn >= todayDate) {
            this.addSubscription = this.knowledgeGatheringPlansService.post(this.projectPowerId, this.knowledgeGatheringPlanFormGroup.value).subscribe(t => {
                this.hideKnowledgeGatheringAddComponent();
            },
                error => {
                    this.toast.show(error, { status: 'error' })
                })
        }
        else {
            this.toast.show("Knowledge Gathering Date should be greater than today's date ", { status: 'error' })
        }
    }

    hideKnowledgeGatheringAddComponent(): void {
        document.body.className = "";
        this.popup.hide(KnowledgeGatheringPlanAddComponent);
    }

    onSearchChangeKnowledgeRequired(value, isFirstTime: boolean = false) {
        
        this.validMessageKnowledgeRequired = ValidMessage.onSearchChangesCommon(value, 250, isFirstTime);
    }

    onSearchChangeSource(value, isFirstTime: boolean = false) {
        
        this.validMessageSource = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeKnowledgeGivenBy(value, isFirstTime: boolean = false) {
        
        this.validMessageKnowledgeGivenBy = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.knowledgeGatheringPlanFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
