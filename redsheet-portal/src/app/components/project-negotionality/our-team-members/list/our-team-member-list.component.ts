import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vOurTeamMemberRecord } from 'app/database-models';
import { vOurTeamMember } from 'app/database-models';
import { OurTeamMembersService } from '../our-team-members.service';
import { OurTeamMemberDomain } from '../domain/our-team-member.domain';

import { OurTeamMemberAddComponent } from 'app/components/project-negotionality/our-team-members/add/our-team-member-add.component';
import { OurTeamMemberEditComponent } from 'app/components/project-negotionality/our-team-members/edit/our-team-member-edit.component';
import { ProjectNegotionalityLookups } from 'app/lookups';

@Component({
    selector:'app-our-team-member-list',
    templateUrl: './our-team-member-list.component.html',
	entryComponents : [ OurTeamMemberAddComponent,  OurTeamMemberEditComponent, ]
})
export class OurTeamMemberListComponent extends OurTeamMemberDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    addDisable:boolean = true;
    ourTeamMembers: vOurTeamMember[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
    userIds:number[];
    @Input()  projectNegotionalityId :number;
    @Input() isLocked:boolean;

    constructor(
        private ourTeamMembersService: OurTeamMembersService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver);  }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();            
        this.listSubscription = this.ourTeamMembersService.get(this.projectNegotionalityId).subscribe(ourTeamMembers => {    
            this.ourTeamMembersService.lookup([ProjectNegotionalityLookups.userLookups]).then( (response: any) =>  {
                ;
                let users = response;
                this.ourTeamMembers = ourTeamMembers;
                 if(this.ourTeamMembers.length == users.userLookups.length)
                 {
                    this.addDisable = false;
                 }
                this.showComponent = true;
            } );       
            // this.ourTeamMembers = ourTeamMembers;
            // this.showComponent = true;
        });
    }

	showOurTeamMemberAddComponent(vOurTeamMember: vOurTeamMember): void {
        this.userIds = [];
        this.ourTeamMembers.forEach(t=>{this.userIds.push(t.userId)});
        document.body.className = "modal-open";
        this.popup.show(OurTeamMemberAddComponent, { projectNegotionalityId: this.projectNegotionalityId, ourTeamMemberId: vOurTeamMember.ourTeamMemberId, userIds: this.userIds}).then(t => this.ngOnInit());        
    }
	showOurTeamMemberEditComponent(vOurTeamMemberRecord: vOurTeamMemberRecord): void {
        this.userIds = [];
        this.ourTeamMembers.forEach(t=>{this.userIds.push(t.userId)});
        document.body.className = "modal-open"
        this.popup.show(OurTeamMemberEditComponent, { projectNegotionalityId: this.projectNegotionalityId, ourTeamMemberId: vOurTeamMemberRecord.ourTeamMemberId, userIds: this.userIds }).then(t => this.ngOnInit());
    }

    deleteOurTeamMember(vOurTeamMember: vOurTeamMember): void
    {
        this.dialog.confirmation([vOurTeamMember.ourTeamMemberName], "delete").then(dialogClick => {
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.ourTeamMembersService.delete(this.projectNegotionalityId,vOurTeamMember.ourTeamMemberId).subscribe(t => {
                    this.deleteSubscription.unsubscribe();
                    this.addDisable = true;
					this.ngOnInit();
				}, error => {
					for (var key in error)
						this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
				});
			}
		});
    }
    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
