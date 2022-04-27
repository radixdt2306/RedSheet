import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteMeetingManagementTiming, vLiteMeetingManagementTiming, vLiteMeetingManagementTimingRecord, } from 'app/database-models';

import { LiteMeetingManagementLookups, } from 'app/lookups';
import { LiteMeetingManagementTimingsService } from '../lite-meeting-management-timings.service';
import { LiteMeetingManagementTimingDomain } from '../domain/lite-meeting-management-timing.domain';
import { LiteMeetingManagementTimingLookupGroup } from '../domain/lite-meeting-management-timing.models';
import { NEGOTIATION_PHASES } from 'app/database-collections';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './lite-meeting-management-timing-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class LiteMeetingManagementTimingEditComponent extends LiteMeetingManagementTimingDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteMeetingManagementTimingFormGroup: FormGroup;
    editSubscription: Subscription;
    liteMeetingManagementTimingLookupGroup: LiteMeetingManagementTimingLookupGroup;;
    @Input() liteMeetingManagementTimingId: number;
    @Input() liteMeetingManagementId: number;
    private negotiation_phase: any;

    validMessageProcess: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private liteMeetingManagementTimingsService: LiteMeetingManagementTimingsService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.negotiation_phase = NEGOTIATION_PHASES;
        this.liteMeetingManagementTimingsService.group(this.liteMeetingManagementId, [this.liteMeetingManagementTimingId], [LiteMeetingManagementLookups.tactics,]).then(
            (response: LiteMeetingManagementTimingLookupGroup) => {
                this.liteMeetingManagementTimingLookupGroup = response;
                this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming = new LiteMeetingManagementTiming(this.liteMeetingManagementTimingLookupGroup.vLiteMeetingManagementTimingRecord);
                this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming.previousLiteMeetingManagementTimingId = 0;
                this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming.previousLiteMeetingManagementTimingSortOrder = 0;
                var date = new Date();
                this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming.previousLiteMeetingManagementTimingTime = "00:00";
                this.liteMeetingManagementTimingFormGroup = this.validation.getFormGroup(this.liteMeetingManagementTimingLookupGroup.liteMeetingManagementTiming);

                this.validMessageProcess = new ValidMessage();

                this.onSearchChangeProcess(this.liteMeetingManagementTimingFormGroup.controls.process.value,
                    this.liteMeetingManagementTimingFormGroup.controls.process.value == '' ? true : false);

                this.showComponent = true;
            });

    }

    editLiteMeetingManagementTiming(): void {
        this.editSubscription = this.liteMeetingManagementTimingsService.put(this.liteMeetingManagementId, this.liteMeetingManagementTimingFormGroup.value).subscribe(t => {
            this.hideLiteMeetingManagementTimingEditComponent();
        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    hideLiteMeetingManagementTimingEditComponent(): void {
        document.body.className = "";
        this.popup.hide(LiteMeetingManagementTimingEditComponent);
    }

    onSearchChangeProcess(value, isFirstTime: boolean = false) {
        
        this.validMessageProcess = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteMeetingManagementTimingFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
