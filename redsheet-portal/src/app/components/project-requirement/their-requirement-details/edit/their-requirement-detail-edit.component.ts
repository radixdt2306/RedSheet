import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { TheirRequirementDetail, vTheirRequirementDetail, vTheirRequirementDetailRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { TheirRequirementDetailsService } from '../their-requirement-details.service';
import { TheirRequirementDetailDomain } from '../domain/their-requirement-detail.domain';
import { TheirRequirementDetailLookupGroup } from '../domain/their-requirement-detail.models';
import { ApplicationBroadcaster } from '@rx/core';
import { PROJECT_MODULE_ADDED, THEIRNEGOTIABLES_CONST } from 'app/const';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './their-requirement-detail-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class TheirRequirementDetailEditComponent extends TheirRequirementDetailDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    theirRequirementDetailFormGroup: FormGroup;
    editSubscription: Subscription;
    theirRequirementDetailLookupGroup: TheirRequirementDetailLookupGroup;
    @Input() theirRequirementDetailId: number;
    @Input() projectRequirementId: number;
    @Input() projectModuleId: number;
    @Input() requirementCategoryId: number;
    @Input() ourRequirementId: number;

    validMessageRequirement: ValidMessage;
    validMessageMdo: ValidMessage;
    validMessageLdo: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private theirRequirementDetailsService: TheirRequirementDetailsService,
        private dialog: RxDialog,
        private applicationBroadcaster: ApplicationBroadcaster,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.theirRequirementDetailsService.getBy(this.projectRequirementId, [this.theirRequirementDetailId]).subscribe(
            (response: vTheirRequirementDetailRecord) => {
                this.theirRequirementDetailLookupGroup = new TheirRequirementDetailLookupGroup();
                this.theirRequirementDetailLookupGroup.theirRequirementDetail = new TheirRequirementDetail(response);
                this.theirRequirementDetailLookupGroup.theirRequirementDetail.previousTheirRequirementDetailSortOrder = 0;
                this.theirRequirementDetailLookupGroup.theirRequirementDetail.previousTheirRequirementId = 0;
                this.theirRequirementDetailFormGroup = this.validation.getFormGroup(this.theirRequirementDetailLookupGroup.theirRequirementDetail);
                this.theirRequirementDetailFormGroup.controls.projectRequirementId.setValue(this.projectRequirementId);
                this.theirRequirementDetailFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

                this.validMessageLdo = new ValidMessage();
                this.validMessageMdo = new ValidMessage();
                this.validMessageRequirement = new ValidMessage();

                this.onSearchChangeRequirement(this.theirRequirementDetailFormGroup.controls.requirement.value,
                    this.theirRequirementDetailFormGroup.controls.requirement.value == '' ? true : false);
                this.onSearchChangeMdo(this.theirRequirementDetailFormGroup.controls.mdo.value,
                    this.theirRequirementDetailFormGroup.controls.mdo.value == '' ? true : false);
                this.onSearchChangeLdo(this.theirRequirementDetailFormGroup.controls.ldo.value,
                    this.theirRequirementDetailFormGroup.controls.ldo.value == '' ? true : false);
                this.showComponent = true;
            });
    }

    editTheirRequirementDetail(): void {
        this.editSubscription = this.theirRequirementDetailsService.put(this.projectRequirementId, this.theirRequirementDetailFormGroup.value).subscribe(t => {
            this.hideTheirRequirementDetail();
            this.router.navigate(["project-requirement", this.projectModuleId, "project-requirements", this.ourRequirementId, this.requirementCategoryId, t.projectRequirementId])
            this.applicationBroadcaster.allTypeBroadCast({ action: PROJECT_MODULE_ADDED.action, value: `/project-requirement/${this.projectModuleId}/project-requirements/${this.ourRequirementId}/${this.requirementCategoryId}/${t.projectRequirementId}`, filterText: THEIRNEGOTIABLES_CONST.value });

        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    hideTheirRequirementDetail(): void {
        document.body.className = "";
        this.popup.hide(TheirRequirementDetailEditComponent);
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
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
