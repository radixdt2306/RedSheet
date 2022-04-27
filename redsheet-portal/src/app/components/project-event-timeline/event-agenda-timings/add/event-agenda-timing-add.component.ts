import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { EventAgendaTiming, } from 'app/database-models';

import { ProjectEventTimelineLookups } from 'app/lookups';
import { EventAgendaTimingsService } from '../event-agenda-timings.service';
import { EventAgendaTimingDomain } from '../domain/event-agenda-timing.domain';
import { EventAgendaTimingLookupGroup } from '../domain/event-agenda-timing.models';
import { NEGOTIATION_PHASES } from 'app/database-collections';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './event-agenda-timing-add.component.html',
    entryComponents: [RxMessageComponent]
})

export class EventAgendaTimingAddComponent extends EventAgendaTimingDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    eventAgendaTimingFormGroup: FormGroup;
    addSubscription: Subscription;
    eventAgendaTimingLookupGroup: EventAgendaTimingLookupGroup;;
    @Input() projectEventTimelineId: number;
    //@Input() rowIndex: number;
    private negotiation_phase: any;

    validMessageTopic: ValidMessage;
    validMessagePurpose: ValidMessage;
    validMessageProcess: ValidMessage;
    validMessagePayOff: ValidMessage;
    validMessageTrigger: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private eventAgendaTimingsService: EventAgendaTimingsService,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.negotiation_phase = NEGOTIATION_PHASES;
        this.eventAgendaTimingsService.lookup([ProjectEventTimelineLookups.tactics]).then(
            (response: EventAgendaTimingLookupGroup) => {
                this.eventAgendaTimingLookupGroup = response;
                this.eventAgendaTimingLookupGroup.eventAgendaTiming = new EventAgendaTiming();
                //this.eventAgendaTimingLookupGroup.eventAgendaTiming.rowIndex = this.rowIndex;
                this.eventAgendaTimingLookupGroup.eventAgendaTiming.previousEventAgendaTimingId = 0;
                //this.eventAgendaTimingLookupGroup.eventAgendaTiming.previousEventAgendaTimingRowIndex = 0;
                this.eventAgendaTimingLookupGroup.eventAgendaTiming.previousEventAgendaTimingSortOrder = 0;
                this.eventAgendaTimingLookupGroup.eventAgendaTiming.tacticsId = -1;
                this.eventAgendaTimingLookupGroup.eventAgendaTiming.sortOrder = 1;
                this.eventAgendaTimingFormGroup = this.validation.getFormGroup(this.eventAgendaTimingLookupGroup.eventAgendaTiming);
                this.eventAgendaTimingFormGroup.controls.projectEventTimelineId.setValue(this.projectEventTimelineId);

                this.validMessageTopic = new ValidMessage();
                this.validMessagePurpose = new ValidMessage();
                this.validMessageProcess = new ValidMessage();
                this.validMessagePayOff = new ValidMessage();
                this.validMessageTrigger = new ValidMessage();

                this.onSearchChangeTopic('' , true);
                this.onSearchChangePurpose('' , true);
                this.onSearchChangeProcess('' , true);
                this.onSearchChangePayOff('' , true);
                this.onSearchChangeTrigger('' , true);
                this.showComponent = true;
            });
    }

    addEventAgendaTiming(): void {
        var time = this.eventAgendaTimingFormGroup.controls.time.valid;
        this.addSubscription = this.eventAgendaTimingsService.post(this.projectEventTimelineId, this.eventAgendaTimingFormGroup.value).subscribe(t => {
            this.hideEventAgendaTimingAddComponent();
        }, error => {
            this.toast.show(error, { status: 'error' })
        })
    }

    hideEventAgendaTimingAddComponent(): void {
        document.body.className = "";
        this.popup.hide(EventAgendaTimingAddComponent);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.eventAgendaTimingFormGroup.dirty;
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

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}