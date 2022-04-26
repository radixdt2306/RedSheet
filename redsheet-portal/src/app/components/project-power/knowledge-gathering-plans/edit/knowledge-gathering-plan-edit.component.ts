import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { KnowledgeGatheringPlan, vKnowledgeGatheringPlan, vKnowledgeGatheringPlanRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { KnowledgeGatheringPlansService } from '../knowledge-gathering-plans.service';
import { KnowledgeGatheringPlanDomain } from '../domain/knowledge-gathering-plan.domain';
import { KnowledgeGatheringPlanLookupGroup } from '../domain/knowledge-gathering-plan.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './knowledge-gathering-plan-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class KnowledgeGatheringPlanEditComponent extends KnowledgeGatheringPlanDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    knowledgeGatheringPlanFormGroup: FormGroup;
    editSubscription: Subscription;
    listSubscription: Subscription;
    manualEntered: boolean = true;
    knowledgeGatheringPlanLookupGroup: KnowledgeGatheringPlanLookupGroup;;
    @Input() knowledgeGatheringPlanId: number;
    @Input() projectPowerId: number;
    @Input() projectModuleId: number;
    ourTeamMembers: any;
    validMessageKnowledgeRequired: ValidMessage;
    validMessageSource: ValidMessage;
    validMessageKnowledgeGivenBy: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private knowledgeGatheringPlansService: KnowledgeGatheringPlansService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.knowledgeGatheringPlansService.getBy(this.projectPowerId, [this.knowledgeGatheringPlanId]).subscribe(
            (response: vKnowledgeGatheringPlanRecord) => {
                if (this.listSubscription)
                    this.listSubscription.unsubscribe();
                this.listSubscription = this.knowledgeGatheringPlansService.search({ projectModuleId: this.projectModuleId }).subscribe(result => {
                    this.ourTeamMembers = result.Users;
                    this.knowledgeGatheringPlanLookupGroup = new KnowledgeGatheringPlanLookupGroup();
                    this.knowledgeGatheringPlanLookupGroup.knowledgeGatheringPlan = new KnowledgeGatheringPlan(response);
                    this.knowledgeGatheringPlanFormGroup = this.validation.getFormGroup(this.knowledgeGatheringPlanLookupGroup.knowledgeGatheringPlan);

                    this.validMessageKnowledgeRequired = new ValidMessage();
                    this.validMessageSource = new ValidMessage();
                    this.validMessageKnowledgeGivenBy = new ValidMessage();

                    this.onSearchChangeKnowledgeRequired(this.knowledgeGatheringPlanFormGroup.controls.knowledgeRequired.value,
                        this.knowledgeGatheringPlanFormGroup.controls.knowledgeRequired.value == '' ? true : false);

                    this.onSearchChangeSource(this.knowledgeGatheringPlanFormGroup.controls.source.value,
                        this.knowledgeGatheringPlanFormGroup.controls.source.value == '' ? true : false);

                    this.onSearchChangeKnowledgeGivenBy(this.knowledgeGatheringPlanFormGroup.controls.knowledgeGivenBy.value,
                        this.knowledgeGatheringPlanFormGroup.controls.knowledgeGivenBy.value == '' ? true : false);

                    this.showComponent = true;
                });
            });
    }


    editKnowledgeGatheringPlan(): void {
        let knowledgeGatheringDate = this.knowledgeGatheringPlanFormGroup.controls.knowledgeGivenOn;
        let todayDate = new Date();
        let knowledgeGatheringPlan: KnowledgeGatheringPlan = this.knowledgeGatheringPlanFormGroup.value;
        if (knowledgeGatheringPlan.knowledgeGivenOn >= todayDate) {
            this.editSubscription = this.knowledgeGatheringPlansService.put(this.projectPowerId, this.knowledgeGatheringPlanFormGroup.value).subscribe(t => {
                this.hideKnowledgeGatheringEditComponent();
            },
                error => {
                    this.toast.show(error, { status: 'error' })
                })
        }
        else {
            this.toast.show("Knowledge Gathering Date should be greater than today's date ", { status: 'error' })
        }
    }

    hideKnowledgeGatheringEditComponent(): void {
        document.body.className = "";
        this.popup.hide(KnowledgeGatheringPlanEditComponent);
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
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
