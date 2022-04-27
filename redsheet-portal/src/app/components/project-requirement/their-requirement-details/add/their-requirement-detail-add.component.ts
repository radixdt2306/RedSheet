import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate, ApplicationBroadcaster } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { TheirRequirementDetail, } from 'app/database-models';

import { } from 'app/lookups';
import { TheirRequirementDetailsService } from '../their-requirement-details.service';
import { TheirRequirementDetailDomain } from '../domain/their-requirement-detail.domain';
import { TheirRequirementDetailLookupGroup } from '../domain/their-requirement-detail.models';
import { PROJECT_MODULE_ADDED, THEIRNEGOTIABLES_CONST } from 'app/const';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './their-requirement-detail-add.component.html',
    entryComponents: [RxMessageComponent]
})

export class TheirRequirementDetailAddComponent extends TheirRequirementDetailDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    theirRequirementDetailFormGroup: FormGroup;
    addSubscription: Subscription;
    theirRequirementDetailLookupGroup: TheirRequirementDetailLookupGroup;;
    @Input() projectRequirementId: number;
    @Input() projectModuleId: number;
    @Input() requirementCategoryId: number;
    @Input() ourRequirementId: number;
    validMessageRequirement: ValidMessage;
    validMessageMdo: ValidMessage;
    validMessageLdo: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private popup: RxPopup,
        private theirRequirementDetailsService: TheirRequirementDetailsService,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
    }

    ngOnInit(): void {
        this.theirRequirementDetailLookupGroup = new TheirRequirementDetailLookupGroup();
        this.theirRequirementDetailLookupGroup.theirRequirementDetail = new TheirRequirementDetail();
        this.theirRequirementDetailLookupGroup.theirRequirementDetail.previousTheirRequirementDetailSortOrder = 1;
        this.theirRequirementDetailLookupGroup.theirRequirementDetail.sortOrder = 1;
        this.theirRequirementDetailLookupGroup.theirRequirementDetail.previousTheirRequirementId = 1;
        this.theirRequirementDetailFormGroup = this.validation.getFormGroup(this.theirRequirementDetailLookupGroup.theirRequirementDetail);
        this.theirRequirementDetailFormGroup.controls.projectRequirementId.setValue(this.projectRequirementId);
        this.theirRequirementDetailFormGroup.controls.projectModuleId.setValue(this.projectModuleId);
        //this.theirRequirementDetailFormGroup.controls.requirementCategoryId.setValue(this.requirementCategoryId);

        this.validMessageLdo = new ValidMessage();
        this.validMessageMdo = new ValidMessage();
        this.validMessageRequirement = new ValidMessage();

        this.onSearchChangeRequirement('', true);
        this.onSearchChangeMdo('', true);
        this.onSearchChangeLdo('', true);

        this.showComponent = true;
    }


    addTheirRequirementDetail(): void {
        this.addSubscription = this.theirRequirementDetailsService.post(this.projectRequirementId, this.theirRequirementDetailFormGroup.value).subscribe(t => {
            //this.router.navigate(["project-requirement", this.projectModuleId, "project-requirements",this.requirementCategoryId, t.projectRequirementId])
            this.router.navigate(["project-requirement", this.projectModuleId, "project-requirements", this.ourRequirementId, this.requirementCategoryId, t.projectRequirementId])
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-requirement/${this.projectModuleId}/project-requirements/${this.ourRequirementId}/${this.requirementCategoryId}/${t.projectRequirementId}`, dependantValue: `${t.projectRequirementId}`, filterText: THEIRNEGOTIABLES_CONST.value });
            this.hideTheirRequirementDetail(t.projectRequirementId);
        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    hideTheirRequirementDetail(projectRequirementId): void {
        document.body.className = "";
        this.popup.hide(TheirRequirementDetailAddComponent, { id: projectRequirementId });
    }

    onSearchChangeRequirement(value, isFirstTime: boolean = false) {
        
        this.validMessageRequirement = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeMdo(value, isFirstTime: boolean = false) {
        
        this.validMessageMdo = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    onSearchChangeLdo(value, isFirstTime: boolean = false) {
        
        this.validMessageLdo = ValidMessage.onSearchChangesCommon(value, 150, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.theirRequirementDetailFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}