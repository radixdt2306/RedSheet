import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vNanoProjectNegotiable } from 'app/database-models';
import { NanoProjectNegotiablesService } from '../nano-project-negotiables.service';
import { NanoProjectNegotiableDomain } from '../domain/nano-project-negotiable.domain';

import { NanoProjectNegotiableAddComponent } from 'app/components/project-module/nano-project-negotiables/add/nano-project-negotiable-add.component';
import { NanoProjectNegotiableEditComponent } from 'app/components/project-module/nano-project-negotiables/edit/nano-project-negotiable-edit.component';

@Component({
    selector:'app-nano-project-negotiable-list',
    templateUrl: './nano-project-negotiable-list.component.html',
	entryComponents : [ NanoProjectNegotiableAddComponent,  NanoProjectNegotiableEditComponent, ]
})
export class NanoProjectNegotiableListComponent extends NanoProjectNegotiableDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    nanoProjectNegotiables: vNanoProjectNegotiable[];
    listSubscription: Subscription;
    deleteSubscription: Subscription;    
	@Input()  projectModuleId :number;
    @Input() isLocked:boolean;
        
    constructor(
        private nanoProjectNegotiablesService: NanoProjectNegotiablesService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.nanoProjectNegotiablesService.get(this.projectModuleId).subscribe(nanoProjectNegotiables => {
            this.nanoProjectNegotiables = nanoProjectNegotiables;
            this.showComponent = true;
        });
    }
   
	showNanoProjectNegotiableAddComponent(vNanoProjectNegotiable: vNanoProjectNegotiable): void {
        document.body.className = "modal-open";
        this.popup.show(NanoProjectNegotiableAddComponent, {  projectModuleId: this.projectModuleId,nanoProjectNegotiableId: vNanoProjectNegotiable.nanoProjectNegotiableId }).then(t => this.ngOnInit());
    }
	showNanoProjectNegotiableEditComponent(vNanoProjectNegotiable: vNanoProjectNegotiable): void {
        document.body.className = "modal-open";
        this.popup.show(NanoProjectNegotiableEditComponent, {  projectModuleId: this.projectModuleId,nanoProjectNegotiableId: vNanoProjectNegotiable.nanoProjectNegotiableId }).then(t => this.ngOnInit());
    }

    showNanoOurRequirementDetailDeleteComponent(vNanoProjectNegotiable: vNanoProjectNegotiable): void {
		this.dialog.confirmation([vNanoProjectNegotiable.requirement], "delete").then(dialogClick => {
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.nanoProjectNegotiablesService.delete(this.projectModuleId,vNanoProjectNegotiable.nanoProjectNegotiableId).subscribe(t => {
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
