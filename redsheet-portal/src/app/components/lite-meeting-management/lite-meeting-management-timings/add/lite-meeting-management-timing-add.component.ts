import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteMeetingManagementTiming, } from 'app/database-models';

import { LiteMeetingManagementLookups, } from 'app/lookups';
import { LiteMeetingManagementTimingsService } from '../lite-meeting-management-timings.service';
import { LiteMeetingManagementTimingDomain } from '../domain/lite-meeting-management-timing.domain';
import { LiteMeetingManagementTimingLookupGroup } from '../domain/lite-meeting-management-timing.models';
import { NEGOTIATION_PHASES } from 'app/database-collections';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './lite-meeting-management-timing-add.component.html',
    entryComponents: [RxMessageComponent]
})

export class LiteMeetingManagementTimingAddComponent extends LiteMeetingManagementTimingDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    liteMeetingManagementTimingFormGroup: FormGroup;
    addSubscription: Subscription;
    liteMeetingManagementTimingLookupGroup: LiteMeetingManagementTimingLookupGroup;;
    @Input() liteMeetingManagementId: number;
    private negotiation_phase: any;

    validMessageProcess: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private liteMeetingManagementTimingsService: LiteMeetingManagementTimingsService,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.negotiation_phase = NEGOTIATION_PHASES;
        this.liteMeetingManagementTimingsService.lookup([LiteMeetingManagementLookups.tactics,]).then(
            (response: LiteMeetingManagementTimingLookupGroup) => {
                this.liteMeetingManagementTimingLookupGroup = response;
                this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming = new LiteMeetingManagementTiming();
                this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming.previousLiteMeetingManagementTimingId = 0;
                this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming.previousLiteMeetingManagementTimingSortOrder = 0;
                this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming.sortOrder = 1;
                this.liteMeetingManagementTimingFormGroup = this.validation.getFormGroup(this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming);
                this.liteMeetingManagementTimingFormGroup.controls.liteMeetingManagementId.setValue(this.liteMeetingManagementId);

                this.validMessageProcess = new ValidMessage();

                this.onSearchChangeProcess('', true);

                this.showComponent = true;
            });
    }

    addLiteMeetingManagementTiming(): void {
        var time = this.liteMeetingManagementTimingFormGroup.controls.time.valid;
        this.addSubscription = this.liteMeetingManagementTimingsService.post(this.liteMeetingManagementId, this.liteMeetingManagementTimingFormGroup.value).subscribe(t => {
            this.hideLiteMeetingManagementTimingAddComponent();
        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    hideLiteMeetingManagementTimingAddComponent(): void {
        document.body.className = "";
        this.popup.hide(LiteMeetingManagementTimingAddComponent);
    }

    onSearchChangeProcess(value, isFirstTime: boolean = false) {
        
        this.validMessageProcess = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteMeetingManagementTimingFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}