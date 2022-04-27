import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { TheirTeamMember, } from 'app/database-models';

import { ProjectNegotiationLookups, } from 'app/lookups';
import { TheirTeamMembersService } from '../their-team-members.service';
import { TheirTeamMemberDomain } from '../domain/their-team-member.domain';
import { TheirTeamMemberLookupGroup } from '../domain/their-team-member.models';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './their-team-member-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class TheirTeamMemberAddComponent extends TheirTeamMemberDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    theirTeamMemberFormGroup: FormGroup;
    addSubscription: Subscription;
    theirTeamMemberLookupGroup: TheirTeamMemberLookupGroup;
    personalityKey: string;
    description: string = '';
    @Input() projectNegotiationId: number;
    validMessageTheirTeamMemberName: ValidMessage;
    validMessagePosition: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private theirTeamMembersService: TheirTeamMembersService,
        private popup: RxPopup,
    ) {
        super();
    }

    ngOnInit(): void {
        this.theirTeamMembersService.lookup([ProjectNegotiationLookups.personalities,]).then(
            (response: TheirTeamMemberLookupGroup) => {

                this.theirTeamMemberLookupGroup = response;
                this.theirTeamMemberLookupGroup.theirTeamMember = new TheirTeamMember();
                this.theirTeamMemberFormGroup = this.validation.getFormGroup(this.theirTeamMemberLookupGroup.theirTeamMember);
                this.theirTeamMemberFormGroup.controls.projectNegotiationId.setValue(this.projectNegotiationId);

                this.validMessageTheirTeamMemberName = new ValidMessage();
                this.validMessagePosition = new ValidMessage();

                this.onSearchChangeTheirTeamMemberName('', true);
                this.onSearchChangePosition('', true);

                this.showComponent = true;
            });
    }


    addTheirTeamMember(): void {

        this.addSubscription = this.theirTeamMembersService.post(this.projectNegotiationId, this.theirTeamMemberFormGroup.value).subscribe(t => {
            this.hideTheirTeamMember();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    checkPersonality(personalityId: number): void {
        this.personalityKey = this.theirTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).personalityKey;
        this.description = this.theirTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).description;
        this.theirTeamMemberFormGroup.controls.personalityId.setValue(personalityId)
    }

    hideTheirTeamMember(): void {
        document.body.className = "";
        this.popup.hide(TheirTeamMemberAddComponent);
    }

    onSearchChangeTheirTeamMemberName(value, isFirstTime: boolean = false) {
        
        this.validMessageTheirTeamMemberName = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    onSearchChangePosition(value, isFirstTime: boolean = false) {
        
        this.validMessagePosition = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.theirTeamMemberFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
