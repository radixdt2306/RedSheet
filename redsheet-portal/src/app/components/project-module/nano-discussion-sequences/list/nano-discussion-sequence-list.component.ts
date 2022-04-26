import { Component, OnInit, OnDestroy,  Input,ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {RxToast, RxDialog, DialogClick, RxPopup, TabModel } from '@rx/view';

import { vNanoDiscussionSequence, NanoDiscussionSequence } from 'app/database-models';
import { NanoDiscussionSequencesService } from '../nano-discussion-sequences.service';
import { NanoDiscussionSequenceDomain } from '../domain/nano-discussion-sequence.domain';

import { NanoDiscussionSequenceAddComponent } from 'app/components/project-module/nano-discussion-sequences/add/nano-discussion-sequence-add.component';
import { NanoDiscussionSequenceEditComponent } from 'app/components/project-module/nano-discussion-sequences/edit/nano-discussion-sequence-edit.component';
import { NEGOTIATION_PHASES } from 'app/database-collections';

@Component({
    selector:'app-nano-discussion-sequence-list',
    templateUrl: './nano-discussion-sequence-list.component.html',
	entryComponents : [ NanoDiscussionSequenceAddComponent,  NanoDiscussionSequenceEditComponent, ]
})
export class NanoDiscussionSequenceListComponent extends NanoDiscussionSequenceDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    nanoDiscussionSequences: vNanoDiscussionSequence[];
    currentNanoDiscussionSequences: vNanoDiscussionSequence[];
    listSubscription: Subscription;
    editSubscription: Subscription;
    negotiationPhases: any;
    isActive: boolean;
    deleteSubscription: Subscription;
	@Input()  projectModuleId :number;
    @Input() isLocked:boolean;
    currentNanoDiscussionSequence: any; 
    previousNanoDiscussionSequence: any; 
    nextNanoDiscussionSequence: any; 
    sortOrder: number; 
    countNanoDiscussionSequences: number = 0;

    constructor(
        private nanoDiscussionSequencesService: NanoDiscussionSequencesService,    
        private dialog: RxDialog,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private popup: RxPopup,
    ) { super();  this.popup.setComponent(componentFactoryResolver); }

    ngOnInit(): void {
        this.sortOrder = -1;
        this.currentNanoDiscussionSequence = null;
        this.previousNanoDiscussionSequence= null;
        this.nextNanoDiscussionSequence= null;
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
        this.listSubscription = this.nanoDiscussionSequencesService.get(this.projectModuleId).subscribe(nanoDiscussionSequences => {
            this.nanoDiscussionSequences = nanoDiscussionSequences;
            this.getData(NEGOTIATION_PHASES[0].negotiationPhaseId);
            this.showComponent = true;
        });
    }

    getData(negotiationPhaseId): void{       
        this.currentNanoDiscussionSequences = this.nanoDiscussionSequences.where(a=>a.negotiationPhaseId == negotiationPhaseId);      
        this.countNanoDiscussionSequences = this.currentNanoDiscussionSequences.count();
    }

	showNanoDiscussionSequenceAddComponent(vNanoDiscussionSequence: vNanoDiscussionSequence): void {
        document.body.className = "modal-open";
        this.popup.show(NanoDiscussionSequenceAddComponent, {projectModuleId: this.projectModuleId, nanoDiscussionSequenceId: vNanoDiscussionSequence.nanoDiscussionSequenceId }).then(t => this.ngOnInit());
    }
	showNanoDiscussionSequenceEditComponent(vNanoDiscussionSequence: vNanoDiscussionSequence): void {
        document.body.className = "modal-open";
        this.popup.show(NanoDiscussionSequenceEditComponent, {projectModuleId: this.projectModuleId, nanoDiscussionSequenceId: vNanoDiscussionSequence.nanoDiscussionSequenceId }).then(t => this.ngOnInit());
    }
    showNanoDiscussionSequenceDeleteComponent(vNanoDiscussionSequence: vNanoDiscussionSequence): void {
		this.dialog.confirmation([vNanoDiscussionSequence.process], "delete").then(dialogClick => {
			if (dialogClick == DialogClick.PrimaryOk) {
				this.deleteSubscription = this.nanoDiscussionSequencesService.delete(this.projectModuleId,vNanoDiscussionSequence.nanoDiscussionSequenceId).subscribe(t => {
					this.deleteSubscription.unsubscribe();
					this.ngOnInit();
				}, error => {
					for (var key in error)
						this.dialog.alert("There is some Dependency. Cannot be deleted", error[key]);
				});
			}
		});
	}

    
    selectEvent(nanoDiscussionSequenceIndex):void{    
        this.sortOrder = nanoDiscussionSequenceIndex;
        this.currentNanoDiscussionSequence = this.currentNanoDiscussionSequences.find(a=>a.sortOrder == nanoDiscussionSequenceIndex);
        this.previousNanoDiscussionSequence= this.currentNanoDiscussionSequences.find(a=>a.sortOrder == nanoDiscussionSequenceIndex-1);
        this.nextNanoDiscussionSequence= this.currentNanoDiscussionSequences.find(a=>a.sortOrder == nanoDiscussionSequenceIndex+1);
    }

    sortUp(templateEvent:any):void{ 
        if(this.previousNanoDiscussionSequence){            
            this.currentNanoDiscussionSequence.sortOrder--;            
            this.previousNanoDiscussionSequence.sortOrder++;            
            var nanoDiscussionSequencetiming = new NanoDiscussionSequence();
            nanoDiscussionSequencetiming = this.currentNanoDiscussionSequence;
            nanoDiscussionSequencetiming.previousNanoDiscussionSequenceId = this.previousNanoDiscussionSequence.nanoDiscussionSequenceId;
            nanoDiscussionSequencetiming.previousNanoDiscussionSequenceSortOrder = this.previousNanoDiscussionSequence.sortOrder;
            nanoDiscussionSequencetiming.previousNanoDiscussionSequenceTime = this.previousNanoDiscussionSequence.time;
            
            this.editSubscription =  this.nanoDiscussionSequencesService.put(this.projectModuleId,nanoDiscussionSequencetiming).subscribe(t => {                             
                templateEvent.sort("sortOrder", true);                
                this.sortOrder = this.previousNanoDiscussionSequence;
                this.currentNanoDiscussionSequence = null;
                this.previousNanoDiscussionSequence= null;
                this.nextNanoDiscussionSequence= null;
            },
                error => {
            })

            
        }

    }

    sortDown(templateEvent: any):void{  
        if(this.nextNanoDiscussionSequence){                
                this.currentNanoDiscussionSequence.sortOrder++;                
                this.nextNanoDiscussionSequence.sortOrder--;
                var nanoDiscussionSequencetiming = new NanoDiscussionSequence();
                nanoDiscussionSequencetiming = this.currentNanoDiscussionSequence;
                nanoDiscussionSequencetiming.previousNanoDiscussionSequenceId = this.nextNanoDiscussionSequence.eventAgendaTimingId;                
                nanoDiscussionSequencetiming.previousNanoDiscussionSequenceSortOrder = this.nextNanoDiscussionSequence.sortOrder;
                nanoDiscussionSequencetiming.previousNanoDiscussionSequenceTime = this.nextNanoDiscussionSequence.time;
                this.editSubscription =  this.nanoDiscussionSequencesService.put(this.projectModuleId,nanoDiscussionSequencetiming).subscribe(t => {                      
                    //this.currentEventAgendaTimings.sort((a,b)=>b.rowIndex-a.rowIndex);
                    templateEvent.sort("sortOrder", true);
                    this.sortOrder = this.nextNanoDiscussionSequence;
                    this.currentNanoDiscussionSequence = null;
                    this.previousNanoDiscussionSequence= null;
                    this.nextNanoDiscussionSequence= null;
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
        this.currentNanoDiscussionSequence = null;
        this.previousNanoDiscussionSequence= null;
        this.nextNanoDiscussionSequence= null;  
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
