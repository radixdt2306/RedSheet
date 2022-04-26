import { Component, OnInit, OnDestroy , Input,ComponentFactoryResolver} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick,RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import {  OurTeamMember, vOurTeamMember, } from 'app/database-models';

import { ProjectNegotionalityLookups, } from 'app/lookups';
import { OurTeamMembersService } from '../our-team-members.service';
import { OurTeamMemberDomain } from '../domain/our-team-member.domain';
import { OurTeamMemberLookupGroup } from '../domain/our-team-member.models';
import { debounce } from 'rxjs/operator/debounce';
import { BEHAVIOURS, ASSERTIVENESS_BEHAVIOURS, CONFLICT_STYLE_BEHVIOURS } from 'app/database-collections';


@Component({
    templateUrl: './our-team-member-edit.component.html',
    entryComponents : [RxMessageComponent]
})
export class OurTeamMemberEditComponent extends OurTeamMemberDomain implements OnInit, OnDestroy {
    showComponent:boolean = false;
    ourTeamMemberFormGroup: FormGroup;
    editSubscription: Subscription;
    ourTeamMemberLookupGroup: any;
    // ourTeamMemberLookupGroup1 : any;
	@Input()  ourTeamMemberId: number;
    @Input()  projectNegotionalityId :number;
    @Input()  userIds: any;
    private behaviours:any;
    private assertivenessBehaviours:any;
    private conflictStyleBehaviours:any;
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private ourTeamMembersService: OurTeamMembersService,    
        private dialog: RxDialog,
		private popup:RxPopup
    ) { 
        super();
            }

    ngOnInit(): void {
        this.ourTeamMembersService.group(this.projectNegotionalityId,[this.ourTeamMemberId],[ ProjectNegotionalityLookups.teamRoles,ProjectNegotionalityLookups.userLookups,]).then(
            (response: any) => {
                this.ourTeamMemberLookupGroup = response;
                for(let userId of this.userIds){
                    let indexOf = -1;
                    var removeLookups = [];
                    this.ourTeamMemberLookupGroup.userLookups.forEach(t=>{
                        if(t.userId != this.ourTeamMemberLookupGroup.ourTeamMember.userId)
                        {
                        var isFind = this.userIds.filter(userId => userId == t.userId)[0]
                        if(isFind){
                            removeLookups.push(t);
                        }
                    }
                    })

                    removeLookups.forEach(t=>{                        
                        let indexOf = this.ourTeamMemberLookupGroup.userLookups.indexOf(t);
                        this.ourTeamMemberLookupGroup.userLookups.splice(indexOf,1);
                    })

                }
                this.ourTeamMemberLookupGroup.teamRoles = response.teamRoles;
                this.ourTeamMemberLookupGroup.ourTeamMember = new OurTeamMember(this.ourTeamMemberLookupGroup.ourTeamMember);
                this.ourTeamMemberFormGroup = this.validation.getFormGroup(this.ourTeamMemberLookupGroup.ourTeamMember);
                this.behaviours = BEHAVIOURS;
                this.assertivenessBehaviours = ASSERTIVENESS_BEHAVIOURS;
                this.conflictStyleBehaviours = CONFLICT_STYLE_BEHVIOURS;
                this.showComponent = true;
            });
    }


    editOurTeamMember(): void {
        this.editSubscription =  this.ourTeamMembersService.put(this.projectNegotionalityId,this.ourTeamMemberFormGroup.value).subscribe(t => {
        this.hideOurTeamMember();
        },
            error => {
                    //this.popup.validationFailed(error);
                    this.toast.show(error,{status: 'error'})
        })
    }

    hideOurTeamMember(): void {
        document.body.className = "";
        this.popup.hide(OurTeamMemberEditComponent);
    }

	canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.ourTeamMemberFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
