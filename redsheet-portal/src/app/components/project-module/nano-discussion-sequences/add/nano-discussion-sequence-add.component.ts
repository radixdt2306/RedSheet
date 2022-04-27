import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { NanoDiscussionSequence, } from 'app/database-models';

import { ProjectModuleLookups, } from 'app/lookups';
import { NanoDiscussionSequencesService } from '../nano-discussion-sequences.service';
import { NanoDiscussionSequenceDomain } from '../domain/nano-discussion-sequence.domain';
import { NanoDiscussionSequenceLookupGroup } from '../domain/nano-discussion-sequence.models';
import { NEGOTIATION_PHASES } from 'app/database-collections';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './nano-discussion-sequence-add.component.html',
    entryComponents: [RxMessageComponent]
})

export class NanoDiscussionSequenceAddComponent extends NanoDiscussionSequenceDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    nanoDiscussionSequenceFormGroup: FormGroup;
    addSubscription: Subscription;
    nanoDiscussionSequenceLookupGroup: NanoDiscussionSequenceLookupGroup;;
    @Input() projectModuleId: number;
    private negotiation_phase: any;

    validMessageProcess: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private nanoDiscussionSequencesService: NanoDiscussionSequencesService,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.negotiation_phase = NEGOTIATION_PHASES;
        this.nanoDiscussionSequencesService.lookup([ProjectModuleLookups.tactics]).then(
            (response: NanoDiscussionSequenceLookupGroup) => {
                this.nanoDiscussionSequenceLookupGroup = response;
                this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence = new NanoDiscussionSequence();
                this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence.previousNanoDiscussionSequenceId = 0;
                this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence.previousNanoDiscussionSequenceSortOrder = 0;
                this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence.sortOrder = 1;
                this.nanoDiscussionSequenceFormGroup = this.validation.getFormGroup(this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence);
                this.nanoDiscussionSequenceFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

                this.validMessageProcess = new ValidMessage();

                this.onSearchChangeProcess('', true);

                this.showComponent = true;
            });
    }

    addNanoDiscussionSequence(): void {
        var time = this.nanoDiscussionSequenceFormGroup.controls.time.valid;
        this.addSubscription = this.nanoDiscussionSequencesService.post(this.projectModuleId, this.nanoDiscussionSequenceFormGroup.value).subscribe(t => {
            this.hideNanoDiscussionSequenceAddComponent();
        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    hideNanoDiscussionSequenceAddComponent(): void {
        document.body.className = "";
        this.popup.hide(NanoDiscussionSequenceAddComponent);
    }

    onSearchChangeProcess(value, isFirstTime: boolean = false) {
        
        this.validMessageProcess = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.nanoDiscussionSequenceFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}