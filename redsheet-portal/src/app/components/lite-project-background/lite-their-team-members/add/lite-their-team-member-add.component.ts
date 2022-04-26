import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteTheirTeamMember, } from 'app/database-models';

import { LiteProjectBackgroundLookups, } from 'app/lookups';
import { LiteTheirTeamMembersService } from '../lite-their-team-members.service';
import { LiteTheirTeamMemberDomain } from '../domain/lite-their-team-member.domain';
import { LiteTheirTeamMemberLookupGroup } from '../domain/lite-their-team-member.models';
import { ValidMessage } from 'app/view-models/validation-message';

@Component({
    templateUrl: './lite-their-team-member-add.component.html',
    entryComponents: [RxMessageComponent]
})

export class LiteTheirTeamMemberAddComponent extends LiteTheirTeamMemberDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    liteTheirTeamMemberFormGroup: FormGroup;
    addSubscription: Subscription;
    liteTheirTeamMemberLookupGroup: LiteTheirTeamMemberLookupGroup;;
    personalityKey: string;
    description: string;
    @Input() liteProjectBackgroundId: number;
    validMessageLiteTheirTeamMemberName: ValidMessage;
    validMessagePosition: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private liteTheirTeamMembersService: LiteTheirTeamMembersService,
        private popup: RxPopup,
    ) {
        super();
    }

    ngOnInit(): void {
        this.liteTheirTeamMembersService.lookup([LiteProjectBackgroundLookups.personalities,]).then(
            (response: LiteTheirTeamMemberLookupGroup) => {
                this.liteTheirTeamMemberLookupGroup = response;
                this.liteTheirTeamMemberLookupGroup.liteTheirTeamMember = new LiteTheirTeamMember();
                this.liteTheirTeamMemberFormGroup = this.validation.getFormGroup(this.liteTheirTeamMemberLookupGroup.liteTheirTeamMember);
                this.liteTheirTeamMemberFormGroup.controls.liteProjectBackgroundId.setValue(this.liteProjectBackgroundId);

                this.validMessageLiteTheirTeamMemberName = new ValidMessage();
                this.validMessagePosition = new ValidMessage();

                this.onSearchChangeLiteTheirTeamMemberName('', true);
                this.onSearchChangePosition('', true);

                this.showComponent = true;
            });
    }

    addLiteTheirTeamMember(): void {
        this.addSubscription = this.liteTheirTeamMembersService.post(this.liteProjectBackgroundId, this.liteTheirTeamMemberFormGroup.value).subscribe(t => {
            this.hideTheirTeamMember();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    checkPersonality(personalityId: number): void {
        this.personalityKey = this.liteTheirTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).personalityKey;
        this.description = this.liteTheirTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).description;
        this.liteTheirTeamMemberFormGroup.controls.personalityId.setValue(personalityId)
    }

    hideTheirTeamMember(): void {
        document.body.className = "";
        this.popup.hide(LiteTheirTeamMemberAddComponent);
    }

    onSearchChangeLiteTheirTeamMemberName(value, isFirstTime: boolean = false) {
        
        this.validMessageLiteTheirTeamMemberName = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    onSearchChangePosition(value, isFirstTime: boolean = false) {
        
        this.validMessagePosition = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteTheirTeamMemberFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
