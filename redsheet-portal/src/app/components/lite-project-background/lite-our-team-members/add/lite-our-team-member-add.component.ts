import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { LiteOurTeamMember, } from 'app/database-models';

import { LiteProjectBackgroundLookups, ProjectNegotionalityLookups, } from 'app/lookups';
import { LiteOurTeamMembersService } from '../lite-our-team-members.service';
import { LiteOurTeamMemberDomain } from '../domain/lite-our-team-member.domain';
import { LiteOurTeamMemberLookupGroup } from '../domain/lite-our-team-member.models';
import { ValidMessage } from 'app/view-models/validation-message';


@Component({
    templateUrl: './lite-our-team-member-add.component.html',
    entryComponents: [RxMessageComponent]
})
export class LiteOurTeamMemberAddComponent extends LiteOurTeamMemberDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    liteOurTeamMemberFormGroup: FormGroup;
    addSubscription: Subscription;
    liteOurTeamMemberLookupGroup: any;
    personalityKey: string;
    liteOurTeamMemberName: any;
    description: string = '';
    manualEntered: boolean = true;
    @Input() liteProjectBackgroundId: number;
    // @Input()  userIds: any;
    validMessagePosition: ValidMessage;

    constructor(
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private liteOurTeamMembersService: LiteOurTeamMembersService,
        private popup: RxPopup,
    ) {
        super();
    }

    ngOnInit(): void {
        this.liteOurTeamMembersService.lookup([LiteProjectBackgroundLookups.personalities, ProjectNegotionalityLookups.userLookups]).then(
            (response: LiteOurTeamMemberLookupGroup) => {
                this.liteOurTeamMemberLookupGroup = response;
                this.liteOurTeamMemberName = this.liteOurTeamMemberLookupGroup.userLookups;
                // for(let userId of this.userIds){
                //     let indexOf = -1;
                //     var removeLookups = [];
                //     this.liteOurTeamMemberLookupGroup.userLookups.forEach(t=>{
                //         var isFind = this.userIds.filter(userId => userId == t.userId)[0]
                //         if(isFind){
                //             removeLookups.push(t);
                //         }
                //     })

                //     removeLookups.forEach(t=>{
                //         let indexOf = this.liteOurTeamMemberLookupGroup.userLookups.indexOf(t);
                //         this.liteOurTeamMemberLookupGroup.userLookups.splice(indexOf,1);
                //     })

                // }
                this.liteOurTeamMemberLookupGroup.liteOurTeamMember = new LiteOurTeamMember();
                let liteOurTeamMember: LiteOurTeamMember = new LiteOurTeamMember();
                liteOurTeamMember.liteOurTeamMemberId = 0;
                // liteOurTeamMember.liteOurTeamMemberName = "abc";
                // liteOurTeamMember.userId = -1;
                liteOurTeamMember.liteProjectBackgroundId = this.liteProjectBackgroundId;
                this.liteOurTeamMemberFormGroup = this.validation.getFormGroup(liteOurTeamMember);
                this.liteOurTeamMemberFormGroup.controls.liteProjectBackgroundId.setValue(this.liteProjectBackgroundId);

                this.validMessagePosition = new ValidMessage();

                this.onSearchChangePosition('', true);
                this.showComponent = true;
            });
    }


    addLiteOurTeamMember(): void {
        let t = this.liteOurTeamMemberFormGroup.value;
        this.addSubscription = this.liteOurTeamMembersService.post(this.liteProjectBackgroundId, this.liteOurTeamMemberFormGroup.value).subscribe(t => {
            this.hideOurTeamMember();
        },
            error => {
                this.toast.show(error, { status: 'error' })
            })
    }

    checkPersonality(personalityId: number): void {
        this.personalityKey = this.liteOurTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).personalityKey;
        this.description = this.liteOurTeamMemberLookupGroup.personalities.find(a => a.personalityId == personalityId).description;
        this.liteOurTeamMemberFormGroup.controls.personalityId.setValue(personalityId)
    }

    hideOurTeamMember(): void {
        document.body.className = "";
        this.popup.hide(LiteOurTeamMemberAddComponent);
    }

    onSearchChangePosition(value, isFirstTime: boolean = false) {
        
        this.validMessagePosition = ValidMessage.onSearchChangesCommon(value, 50, isFirstTime);
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.liteOurTeamMemberFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
