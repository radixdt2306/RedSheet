import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { NanoDiscussionSequence, vNanoDiscussionSequence, vNanoDiscussionSequenceRecord, } from 'app/database-models';

import { ProjectModuleLookups, } from 'app/lookups';
import { NanoDiscussionSequencesService } from '../nano-discussion-sequences.service';
import { NanoDiscussionSequenceDomain } from '../domain/nano-discussion-sequence.domain';
import { NanoDiscussionSequenceLookupGroup } from '../domain/nano-discussion-sequence.models';
import { NEGOTIATION_PHASES } from 'app/database-collections';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './nano-discussion-sequence-edit.component.html',
    entryComponents: [RxMessageComponent]
})


export class NanoDiscussionSequenceEditComponent extends NanoDiscussionSequenceDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    nanoDiscussionSequenceFormGroup: FormGroup;
    editSubscription: Subscription;
    nanoDiscussionSequenceLookupGroup: NanoDiscussionSequenceLookupGroup;;
    @Input() nanoDiscussionSequenceId: number;
    @Input() projectModuleId: number;
    private negotiation_phase: any;

    validMessageProcess: ValidMessage;

    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private nanoDiscussionSequencesService: NanoDiscussionSequencesService,
        private dialog: RxDialog,
        private popup: RxPopup
    ) {
        super();
    }

    ngOnInit(): void {
        this.negotiation_phase = NEGOTIATION_PHASES;
        this.nanoDiscussionSequencesService.group(this.projectModuleId, [this.nanoDiscussionSequenceId], [ProjectModuleLookups.tactics,]).then(
            (response: NanoDiscussionSequenceLookupGroup) => {
                this.nanoDiscussionSequenceLookupGroup = response;
                this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence = new NanoDiscussionSequence(this.nanoDiscussionSequenceLookupGroup.vNanoDiscussionSequenceRecord);
                this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence.previousNanoDiscussionSequenceId = 0;
                this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence.previousNanoDiscussionSequenceSortOrder = 0;
                var date = new Date();
                this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence.previousNanoDiscussionSequenceTime = "00:00";
                this.nanoDiscussionSequenceFormGroup = this.validation.getFormGroup(this.nanoDiscussionSequenceLookupGroup.nanoDiscussionSequence);

                this.validMessageProcess = new ValidMessage();

                this.onSearchChangeProcess(this.nanoDiscussionSequenceFormGroup.controls.process.value,
                    this.nanoDiscussionSequenceFormGroup.controls.process.value == '' ? true : false);

                this.showComponent = true;
            });
    }

    editNanoDiscussionSequence(): void {
        this.editSubscription = this.nanoDiscussionSequencesService.put(this.projectModuleId, this.nanoDiscussionSequenceFormGroup.value).subscribe(t => {
            this.hideNanoDiscussionSequenceEditComponent();
        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    hideNanoDiscussionSequenceEditComponent(): void {
        document.body.className = "";
        this.popup.hide(NanoDiscussionSequenceEditComponent);
    }

    onSearchChangeProcess(value, isFirstTime: boolean = false) {
        
        this.validMessageProcess = ValidMessage.onSearchChangesCommon(value, 400, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.nanoDiscussionSequenceFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}