import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate, ApplicationBroadcaster } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { NanoProjectNegotiable, } from 'app/database-models';

import { } from 'app/lookups';
import { NanoProjectNegotiablesService } from '../nano-project-negotiables.service';
import { NanoProjectNegotiableDomain } from '../domain/nano-project-negotiable.domain';
import { NanoProjectNegotiableLookupGroup } from '../domain/nano-project-negotiable.models';
import { SHOW_SIDE_BAR } from 'app/const';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './nano-project-negotiable-add.component.html',
    entryComponents: [RxMessageComponent]
})

export class NanoProjectNegotiableAddComponent extends NanoProjectNegotiableDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    nanoProjectNegotiableFormGroup: FormGroup;
    addSubscription: Subscription;
    nanoProjectNegotiableLookupGroup: NanoProjectNegotiableLookupGroup;;
    @Input() projectModuleId: number;

    validMessageRequirement: ValidMessage;
    validMessageMdo: ValidMessage;
    validMessageLdo: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private nanoProjectNegotiablesService: NanoProjectNegotiablesService,
        private popup: RxPopup,
        private applicationBroadcaster: ApplicationBroadcaster
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR);
    }

    ngOnInit(): void {
        this.nanoProjectNegotiableLookupGroup = new NanoProjectNegotiableLookupGroup();
        this.nanoProjectNegotiableLookupGroup.nanoProjectNegotiable = new NanoProjectNegotiable();
        this.nanoProjectNegotiableFormGroup = this.validation.getFormGroup(this.nanoProjectNegotiableLookupGroup.nanoProjectNegotiable);
        this.nanoProjectNegotiableFormGroup.controls.projectModuleId.setValue(this.projectModuleId);

        this.validMessageRequirement = new ValidMessage();
        this.validMessageMdo = new ValidMessage();
        this.validMessageLdo = new ValidMessage();

        this.onSearchChangeRequirement('', true);
        this.onSearchChangeMdo('', true);
        this.onSearchChangeLdo('', true);

        this.showComponent = true;
    }

    addNanoProjectNegotiable(): void {
        this.addSubscription = this.nanoProjectNegotiablesService.post(this.projectModuleId, this.nanoProjectNegotiableFormGroup.value).subscribe(t => {
            this.hideNanoProjectNegotiableAddComponent();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    hideNanoProjectNegotiableAddComponent(): void {
        document.body.className = "";
        this.popup.hide(NanoProjectNegotiableAddComponent);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.nanoProjectNegotiableFormGroup.dirty;
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

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }
}