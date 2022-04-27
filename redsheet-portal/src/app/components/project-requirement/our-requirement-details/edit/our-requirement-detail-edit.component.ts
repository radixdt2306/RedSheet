import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { HIDE_SIDE_BAR, SHOW_SIDE_BAR, PROJECT_MODULE_ADDED, NEGOTIABLES_CONST, THEIRNEGOTIABLES_CONST } from 'app/const';
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { OurRequirementDetail, vOurRequirementDetail, vOurRequirementDetailRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { OurRequirementDetailsService } from '../our-requirement-details.service';
import { OurRequirementDetailDomain } from '../domain/our-requirement-detail.domain';
import { OurRequirementDetailLookupGroup } from '../domain/our-requirement-detail.models';
import { PAIN_FACTORS, REQUIREMENT_CATEGORIES } from 'app/database-collections';
import { ApplicationBroadcaster } from '@rx/core';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './our-requirement-detail-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class OurRequirementDetailEditComponent extends OurRequirementDetailDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    ourRequirementDetailFormGroup: FormGroup;
    editSubscription: Subscription;
    ourRequirementDetailLookupGroup: OurRequirementDetailLookupGroup;;
    @Input() ourRequirementDetailId: number;
    @Input() projectRequirementId: number;
    @Input() projectModuleId: number;
    @Input() requirementCategoryId: number;
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
        private ourRequirementDetailsService: OurRequirementDetailsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
    }

    ngOnInit(): void {
        this.ourRequirementDetailsService.getBy(this.projectRequirementId, [this.ourRequirementDetailId]).subscribe(
            (response: vOurRequirementDetailRecord) => {
                this.ourRequirementDetailLookupGroup = new OurRequirementDetailLookupGroup();
                this.ourRequirementDetailLookupGroup.ourRequirementDetail = new OurRequirementDetail(response);
                this.ourRequirementDetailFormGroup = this.validation.getFormGroup(this.ourRequirementDetailLookupGroup.ourRequirementDetail);
                this.ourRequirementDetailFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
                this.pain_factors = PAIN_FACTORS;

                this.validMessageRequirement = new ValidMessage();
                this.validMessageMdo = new ValidMessage();
                this.validMessageSecondStep = new ValidMessage();
                this.validMessageThirdStep = new ValidMessage();
                this.validMessageLdo = new ValidMessage();
                this.validMessageFourStep = new ValidMessage();

                this.onSearchChangeRequirement(this.ourRequirementDetailFormGroup.controls.requirement.value,
                    this.ourRequirementDetailFormGroup.controls.requirement.value == '' ? true : false);
                this.onSearchChangeMdo(this.ourRequirementDetailFormGroup.controls.mdo.value,
                    this.ourRequirementDetailFormGroup.controls.mdo.value == '' ? true : false);
                this.onSearchChangeSecondStep(this.ourRequirementDetailFormGroup.controls.secondStep.value,
                    this.ourRequirementDetailFormGroup.controls.secondStep.value == '' ? true : false);
                this.onSearchChangeFourStep(this.ourRequirementDetailFormGroup.controls.thirdStep.value,
                    this.ourRequirementDetailFormGroup.controls.thirdStep.value == '' ? true : false);
                this.onSearchChangeLdo(this.ourRequirementDetailFormGroup.controls.fourStep.value,
                    this.ourRequirementDetailFormGroup.controls.fourStep.value == '' ? true : false);
                this.onSearchChangeThirdStep(this.ourRequirementDetailFormGroup.controls.ldo.value,
                    this.ourRequirementDetailFormGroup.controls.ldo.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    editOurRequirementDetail(): void {
        this.editSubscription = this.ourRequirementDetailsService.put(this.projectRequirementId, this.ourRequirementDetailFormGroup.value).subscribe(t => {
            this.hideOurRequirementDetailEditComponent();
            this.router.navigate(["project-requirement", this.projectModuleId, "project-requirements", this.requirementCategoryId, t.projectRequirementId])
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-requirement/${this.projectModuleId}/project-requirements/${this.requirementCategoryId}/${t.projectRequirementId}`, dependantValue: `${t.projectRequirementId}`, filterText: NEGOTIABLES_CONST.value });
            //this.applicationBroadcaster.allTypeBroadCast({action:PROJECT_MODULE_ADDED.action,value:`/project-requirement/${this.projectModuleId}/project-requirements/${this.projectRequirementId}/${REQUIREMENT_CATEGORIES[1].requirementCategoryId}}/0`,filterText:THEIRNEGOTIABLES_CONST.value});

        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    hideOurRequirementDetailEditComponent(): void {
        document.body.className = "";
        this.popup.hide(OurRequirementDetailEditComponent);
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
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
