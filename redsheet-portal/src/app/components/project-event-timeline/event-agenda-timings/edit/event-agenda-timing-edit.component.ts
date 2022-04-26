import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { EventAgendaTiming, vEventAgendaTiming, vEventAgendaTimingRecord, } from 'app/database-models';

import { ProjectEventTimelineLookups } from 'app/lookups';
import { EventAgendaTimingsService } from '../event-agenda-timings.service';
import { EventAgendaTimingDomain } from '../domain/event-agenda-timing.domain';
import { EventAgendaTimingLookupGroup } from '../domain/event-agenda-timing.models';
import { NEGOTIATION_PHASES } from 'app/database-collections';
import { Timestamp } from 'rxjs/operators/timestamp';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './event-agenda-timing-edit.component.html',
    entryComponents: [RxMessageComponent]
})

export class EventAgendaTimingEditComponent extends EventAgendaTimingDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    eventAgendaTimingFormGroup: FormGroup;
    editSubscription: Subscription;
    eventAgendaTimingLookupGroup: EventAgendaTimingLookupGroup;;
    @Input() eventAgendaTimingId: number;
    @Input() projectEventTimelineId: number;
    private negotiation_phase: any;

    validMessageTopic: ValidMessage;
    validMessagePurpose: ValidMessage;
    validMessageProcess: ValidMessage;
    validMessagePayOff: ValidMessage;
    validMessageTrigger: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private eventAgendaTimingsService: EventAgendaTimingsService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.negotiation_phase = NEGOTIATION_PHASES;
        this.eventAgendaTimingsService.group(this.projectEventTimelineId, [this.eventAgendaTimingId], [ProjectEventTimelineLookups.tactics,]).then(
            (response: EventAgendaTimingLookupGroup) => {

                this.eventAgendaTimingLookupGroup = response;
                this.eventAgendaTimingLookupGroup.eventAgendaTiming = new EventAgendaTiming(this.eventAgendaTimingLookupGroup.vEventAgendaTimingRecord);
                //this.eventAgendaTimingLookupGroup.eventAgendaTiming.rowIndex = response.vEventAgendaTimingRecord.rowIndex;
                this.eventAgendaTimingLookupGroup.eventAgendaTiming.previousEventAgendaTimingId = 0;
                //this.eventAgendaTimingLookupGroup.eventAgendaTiming.previousEventAgendaTimingRowIndex = 0;
                this.eventAgendaTimingLookupGroup.eventAgendaTiming.previousEventAgendaTimingSortOrder = 0;
                var date = new Date();
                this.eventAgendaTimingLookupGroup.eventAgendaTiming.previousEventAgendaTimingTime = "00:00";
                this.eventAgendaTimingFormGroup = this.validation.getFormGroup(this.eventAgendaTimingLookupGroup.eventAgendaTiming);

                this.validMessageTopic = new ValidMessage();
                this.validMessagePurpose = new ValidMessage();
                this.validMessageProcess = new ValidMessage();
                this.validMessagePayOff = new ValidMessage();
                this.validMessageTrigger = new ValidMessage();

                this.onSearchChangeTopic(this.eventAgendaTimingFormGroup.controls.topic.value,
                    this.eventAgendaTimingFormGroup.controls.topic.value == '' ? true : false);
                this.onSearchChangePurpose(this.eventAgendaTimingFormGroup.controls.purpose.value,
                    this.eventAgendaTimingFormGroup.controls.purpose.value == '' ? true : false);
                this.onSearchChangeProcess(this.eventAgendaTimingFormGroup.controls.process.value,
                    this.eventAgendaTimingFormGroup.controls.process.value == '' ? true : false);
                this.onSearchChangePayOff(this.eventAgendaTimingFormGroup.controls.payOff.value,
                    this.eventAgendaTimingFormGroup.controls.payOff.value == '' ? true : false);
                this.onSearchChangeTrigger(this.eventAgendaTimingFormGroup.controls.trigger.value,
                    this.eventAgendaTimingFormGroup.controls.trigger.value == '' ? true : false);

                this.showComponent = true;
            });
    }


    editEventAgendaTiming(): void {
        this.editSubscription = this.eventAgendaTimingsService.put(this.projectEventTimelineId, this.eventAgendaTimingFormGroup.value).subscribe(t => {
            this.hideEventAgendaTimingEditComponent();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    hideEventAgendaTimingEditComponent(): void {
        document.body.className = "";
        this.popup.hide(EventAgendaTimingEditComponent);
    }

    onSearchChangeTopic(value, isFirstTime: boolean = false) {
        
        this.validMessageTopic = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangePurpose(value, isFirstTime: boolean = false) {
        
        this.validMessagePurpose = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeProcess(value, isFirstTime: boolean = false) {
        
        this.validMessageProcess = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangePayOff(value, isFirstTime: boolean = false) {
        
        this.validMessagePayOff = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    onSearchChangeTrigger(value, isFirstTime: boolean = false) {
        
        this.validMessageTrigger = ValidMessage.onSearchChangesCommon(value, 200, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.eventAgendaTimingFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
