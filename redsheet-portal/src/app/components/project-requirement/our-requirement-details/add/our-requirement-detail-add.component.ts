import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, NEGOTIABLES_CONST, THEIRNEGOTIABLES_CONST } from 'app/const';
import { ComponentCanDeactivate, ApplicationBroadcaster } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { OurRequirementDetail, } from 'app/database-models';

import { } from 'app/lookups';
import { OurRequirementDetailsService } from '../our-requirement-details.service';
import { OurRequirementDetailDomain } from '../domain/our-requirement-detail.domain';
import { OurRequirementDetailLookupGroup } from '../domain/our-requirement-detail.models';
import { PAIN_FACTORS, REQUIREMENT_CATEGORIES } from 'app/database-collections';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './our-requirement-detail-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class OurRequirementDetailAddComponent extends OurRequirementDetailDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    ourRequirementDetailFormGroup: FormGroup;
    addSubscription: Subscription;
    ourRequirementDetailLookupGroup: OurRequirementDetailLookupGroup;;
    @Input() projectRequirementId: number;
    @Input() projectModuleId: number;
    @Input() requirementCategoryId: number;
    @Input() theirProjectModuleId: number;
    private pain_factors: any;

    validMessageRequirement: ValidMessage;
    validMessageMdo: ValidMessage;
    validMessageSecondStep: ValidMessage;
    validMessageThirdStep: ValidMessage;
    validMessageLdo: ValidMessage;
    validMessageFourStep: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private popup: RxPopup,
        private ourRequirementDetailsService: OurRequirementDetailsService,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
    }

    ngOnInit(): void {
        this.ourRequirementDetailLookupGroup = new OurRequirementDetailLookupGroup();
        this.ourRequirementDetailLookupGroup.ourRequirementDetail = new OurRequirementDetail();
        this.ourRequirementDetailFormGroup = this.validation.getFormGroup(this.ourRequirementDetailLookupGroup.ourRequirementDetail);
        this.ourRequirementDetailFormGroup.controls.projectRequirementId.setValue(this.projectRequirementId);
        this.ourRequirementDetailFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
        this.pain_factors = PAIN_FACTORS;

        this.validMessageRequirement = new ValidMessage();
        this.validMessageMdo = new ValidMessage();
        this.validMessageSecondStep = new ValidMessage();
        this.validMessageThirdStep = new ValidMessage();
        this.validMessageLdo = new ValidMessage();
        this.validMessageFourStep = new ValidMessage();

        this.onSearchChangeRequirement('', true);
        this.onSearchChangeMdo('', true);
        this.onSearchChangeSecondStep('', true);
        this.onSearchChangeFourStep('', true);
        this.onSearchChangeLdo('', true);
        this.onSearchChangeThirdStep('', true);

        this.showComponent = true;
    }


    addOurRequirementDetail(): void {

        this.addSubscription = this.ourRequirementDetailsService.post(this.projectRequirementId, this.ourRequirementDetailFormGroup.value).subscribe(t => {
            this.hideOurRequirementDetailAddComponent(t.projectRequirementId);
            this.router.navigate(["project-requirement", this.projectModuleId, "project-requirements", this.requirementCategoryId, t.projectRequirementId])
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-requirement/${this.projectModuleId}/project-requirements/${this.requirementCategoryId}/${t.projectRequirementId}`, dependantValue: `${t.projectRequirementId}`, filterText: NEGOTIABLES_CONST.value });
            //this.applicationBroadcaster.allTypeBroadCast({action:PROJECT_MODULE_ADDED.action,value:`/project-requirement/${this.projectModuleId}/project-requirements/${t.projectRequirementId}/${REQUIREMENT_CATEGORIES[1].requirementCategoryId}/0`,filterText:THEIRNEGOTIABLES_CONST.value});

        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    hideOurRequirementDetailAddComponent(projectRequirementId): void {
        document.body.className = "";
        this.popup.hide(OurRequirementDetailAddComponent, { id: projectRequirementId });
    }

    onSearchChangeRequirement(value, isFirstTime: boolean = false) {
        
        this.validMessageRequirement = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeMdo(value, isFirstTime: boolean = false) {
        
        this.validMessageMdo = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeSecondStep(value, isFirstTime: boolean = false) {
        
        this.validMessageSecondStep = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeFourStep(value, isFirstTime: boolean = false) {
        
        this.validMessageFourStep = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeLdo(value, isFirstTime: boolean = false) {
        
        this.validMessageLdo = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeThirdStep(value, isFirstTime: boolean = false) {
        
        this.validMessageThirdStep = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.ourRequirementDetailFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
