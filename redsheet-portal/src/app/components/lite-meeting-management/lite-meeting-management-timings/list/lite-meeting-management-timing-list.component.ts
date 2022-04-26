import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vLiteMeetingManagementTiming, LiteMeetingManagementTiming } from 'app/database-models';
import { LiteMeetingManagementTimingsService } from '../lite-meeting-management-timings.service';
import { LiteMeetingManagementTimingDomain } from '../domain/lite-meeting-management-timing.domain';

import { LiteMeetingManagementTimingEditComponent } from 'app/components/lite-meeting-management/lite-meeting-management-timings/edit/lite-meeting-management-timing-edit.component';
import { LiteMeetingManagementTimingAddComponent } from 'app/components/lite-meeting-management/lite-meeting-management-timings/add/lite-meeting-management-timing-add.component';
import { NEGOTIATION_PHASES } from 'app/database-collections';

@Component({
    selector:'app-lite-meeting-management-timing-list',
    templateUrl: './lite-meeting-management-timing-list.component.html',
	entryComponents : [ LiteMeetingManagementTimingEditComponent,  LiteMeetingManagementTimingAddComponent, ]
})
export class LiteMeetingManagementTimingListComponent extends LiteMeetingManagementTimingDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    liteMeetingManagementTimings: vLiteMeetingManagementTiming[];
    currentLiteMeetingManagementTimings: vLiteMeetingManagementTiming[];
    listSubscription: Subscription;
    editSubscription: Subscription;
    negotiationPhases: any;
    isActive: boolean;
    deleteSubscription: Subscription;
	@Input()  liteMeetingManagementId :number;
    @Input() isLocked:boolean;
    currentLiteMeetingManagementTiming: any; 
    previousLiteMeetingManagementTiming: any; 
    nextLiteMeetingManagementTiming: any; 
    sortOrder: number; 
    countLiteMeetingManagementTimings: number = 0;
    constructor(
        private liteMeetingManagementTimingsService: LiteMeetingManagementTimingsService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        this.sortOrder = -1; 
        this.currentLiteMeetingManagementTiming = null;
        this.previousLiteMeetingManagementTiming= null;
        this.nextLiteMeetingManagementTiming= null;    
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
            this.negotiationPhases = NEGOTIATION_PHASES;        
            for(let i = 0;i<this.negotiationPhases.length;i++)
            {
                if(i == 0)
                    this.negotiationPhases[0]["isActive"] = true;
                else
                    this.negotiationPhases[i]["isActive"] = false;
            }
        this.listSubscription = this.liteMeetingManagementTimingsService.get(this.liteMeetingManagementId).subscribe(liteMeetingManagementTimings => {
            this.liteMeetingManagementTimings = liteMeetingManagementTimings;
            this.getData(NEGOTIATION_PHASES[0].negotiationPhaseId);
            this.showComponent = true;
        });
    }

    getData(negotiationPhaseId): void{       
        this.currentLiteMeetingManagementTimings = this.liteMeetingManagementTimings.where(a=>a.negotiationPhaseId == negotiationPhaseId);      
        this.countLiteMeetingManagementTimings = this.currentLiteMeetingManagementTimings.count();
    }

	showLiteMeetingManagementTimingEditComponent(vLiteMeetingManagementTiming: vLiteMeetingManagementTiming): void {
        document.body.className = "modal-open";
        this.popup.show(LiteMeetingManagementTimingEditComponent, {liteMeetingManagementId : this.liteMeetingManagementId, liteMeetingManagementTimingId: vLiteMeetingManagementTiming.liteMeetingManagementTimingId }).then(t => this.ngOnInit());
    }
	showLiteMeetingManagementTimingAddComponent(vLiteMeetingManagementTiming: vLiteMeetingManagementTiming): void {
        document.body.className = "modal-open";
        this.popup.show(LiteMeetingManagementTimingAddComponent, {liteMeetingManagementId : this.liteMeetingManagementId, liteMeetingManagementTimingId: vLiteMeetingManagementTiming.liteMeetingManagementTimingId }).then(t => this.ngOnInit());
    }

    showLiteMeetingManagementTimingDeleteComponent(vLiteMeetingManagementTiming: vLiteMeetingManagementTiming): void {
		this.dialog.confirmation([vLiteMeetingManagementTiming.process], "delete").then(dialogClick => {
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.liteMeetingManagementTimingsService.delete(this.liteMeetingManagementId,vLiteMeetingManagementTiming.liteMeetingManagementTimingId).subscribe(t => {
					this.deleteSubscription.unsubscribe();
					this.ngOnInit();
				}, error => {
					for (var key in error)
						this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
				});
			}
		});
	}

    
    selectEvent(liteMeetingManagementTimingIndex):void{    
        this.sortOrder = liteMeetingManagementTimingIndex;
        this.currentLiteMeetingManagementTiming = this.currentLiteMeetingManagementTimings.find(a=>a.sortOrder == liteMeetingManagementTimingIndex);
        this.previousLiteMeetingManagementTiming= this.currentLiteMeetingManagementTimings.find(a=>a.sortOrder == liteMeetingManagementTimingIndex-1);
        this.nextLiteMeetingManagementTiming= this.currentLiteMeetingManagementTimings.find(a=>a.sortOrder == liteMeetingManagementTimingIndex+1);
    }

    sortUp(templateEvent:any):void{ 
        if(this.previousLiteMeetingManagementTiming){            
            this.currentLiteMeetingManagementTiming.sortOrder--;            
            this.previousLiteMeetingManagementTiming.sortOrder++;            
            var liteMeetingManagementtiming = new LiteMeetingManagementTiming();
            liteMeetingManagementtiming = this.currentLiteMeetingManagementTiming;
            liteMeetingManagementtiming.previousLiteMeetingManagementTimingId = this.previousLiteMeetingManagementTiming.liteMeetingManagementTimingId;
            //eventAgendatiming.previousEventAgendaTimingRowIndex = this.previousEventAgendaTiming.rowIndex;
            liteMeetingManagementtiming.previousLiteMeetingManagementTimingSortOrder = this.previousLiteMeetingManagementTiming.sortOrder;
            liteMeetingManagementtiming.previousLiteMeetingManagementTimingTime = this.previousLiteMeetingManagementTiming.time;
            
            this.editSubscription =  this.liteMeetingManagementTimingsService.put(this.liteMeetingManagementId,liteMeetingManagementtiming).subscribe(t => {                             
                templateEvent.sort("sortOrder", true);                
                this.sortOrder = this.previousLiteMeetingManagementTiming;
                this.currentLiteMeetingManagementTiming = null;
                this.previousLiteMeetingManagementTiming= null;
                this.nextLiteMeetingManagementTiming= null;
            },
                error => {
            })

            
        }

    }

    sortDown(templateEvent: any):void{  
        if(this.nextLiteMeetingManagementTiming){                
                this.currentLiteMeetingManagementTiming.sortOrder++;                
                this.nextLiteMeetingManagementTiming.sortOrder--;
                var liteMeetingManagementtiming = new LiteMeetingManagementTiming();
                liteMeetingManagementtiming = this.currentLiteMeetingManagementTiming;
                liteMeetingManagementtiming.previousLiteMeetingManagementTimingId = this.nextLiteMeetingManagementTiming.liteMeetingManagementTimingId;                
                liteMeetingManagementtiming.previousLiteMeetingManagementTimingSortOrder = this.nextLiteMeetingManagementTiming.sortOrder;
                liteMeetingManagementtiming.previousLiteMeetingManagementTimingTime = this.nextLiteMeetingManagementTiming.time;
                this.editSubscription =  this.liteMeetingManagementTimingsService.put(this.liteMeetingManagementId,liteMeetingManagementtiming).subscribe(t => {                      
                    //this.currentEventAgendaTimings.sort((a,b)=>b.rowIndex-a.rowIndex);
                    templateEvent.sort("sortOrder", true);
                    this.sortOrder = this.nextLiteMeetingManagementTiming;
                    this.currentLiteMeetingManagementTiming = null;
                    this.previousLiteMeetingManagementTiming= null;
                    this.nextLiteMeetingManagementTiming= null;
                },
                    error => {
                    
                })
        }
    }

    getTabName(Name):string{
        return Name.negotiationPhaseName + '-tab';
    }

    getTabSelected(index,negotiationPhaseId):void{ 
        this.sortOrder = -1; 
        this.currentLiteMeetingManagementTiming = null;
        this.previousLiteMeetingManagementTiming= null;
        this.nextLiteMeetingManagementTiming= null;      
        this.getData(negotiationPhaseId);
        for(let i = 0;i<this.negotiationPhases.length;i++)
        {
            if(i == index)
                this.negotiationPhases[i].isActive = true;
            else
                this.negotiationPhases[i].isActive = false;
        }
    }



    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }
}
