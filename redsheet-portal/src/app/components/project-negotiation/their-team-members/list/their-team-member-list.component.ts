import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vTheirTeamMember } from 'app/database-models';
import { TheirTeamMembersService } from '../their-team-members.service';
import { TheirTeamMemberDomain } from '../domain/their-team-member.domain';

import { TheirTeamMemberAddComponent } from 'app/components/project-negotiation/their-team-members/add/their-team-member-add.component';
import { TheirTeamMemberEditComponent } from 'app/components/project-negotiation/their-team-members/edit/their-team-member-edit.component';

@Component({
    selector:'app-their-team-member-list',
    templateUrl: './their-team-member-list.component.html',
	entryComponents : [ TheirTeamMemberAddComponent,  TheirTeamMemberEditComponent, ]
})
export class TheirTeamMemberListComponent extends TheirTeamMemberDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    theirTeamMembers: vTheirTeamMember[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;
	@Input()  projectNegotiationId :number;
    @Input() isLocked:boolean;
    constructor(
        private theirTeamMembersService: TheirTeamMembersService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.theirTeamMembersService.get(this.projectNegotiationId).subscribe(theirTeamMembers => {
            this.theirTeamMembers = theirTeamMembers;
            this.showComponent = true;
        });
    }

	showTheirTeamMemberAddComponent(vTheirTeamMember: vTheirTeamMember): void {
        document.body.className = "modal-open";
        this.popup.show(TheirTeamMemberAddComponent, {projectNegotiationId: this.projectNegotiationId, theirTeamMemberId: vTheirTeamMember.theirTeamMemberId }).then(t => this.ngOnInit());
    }
	showTheirTeamMemberEditComponent(vTheirTeamMember: vTheirTeamMember): void {
        document.body.className = "modal-open";
        this.popup.show(TheirTeamMemberEditComponent, {projectNegotiationId: this.projectNegotiationId, theirTeamMemberId: vTheirTeamMember.theirTeamMemberId }).then(t => this.ngOnInit());
    }
    showTheirTeamMemberDeleteComponent(vTheirTeamMember: vTheirTeamMember): void {
                
		this.dialog.confirmation([vTheirTeamMember.theirTeamMemberName], "delete").then(dialogClick => {
            
			if (dialogClick == DialogClick.PrimaryOk) {
                
				this.deleteSubscription = this.theirTeamMembersService.delete(this.projectNegotiationId,vTheirTeamMember.theirTeamMemberId).subscribe(t => {
					this.deleteSubscription.unsubscribe();
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
