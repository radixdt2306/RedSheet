import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { ProjectModuleDomain } from '../domain/project-module.domain';
import { ProjectModulesService } from '../project-modules.service';
import { Project, ProjectModule } from 'app/database-models';
import { ProjectsService } from 'app/components/project/projects/projects.service';
import { ProjectLookupGroup } from 'app/components/project/projects/domain/project.models';
import { RxPopup,RxToast } from '@rx/view';
import { RxStorage } from '@rx/storage';
import { ApplicationBroadcaster } from '@rx/core';
import { IS_MODULE_LOCK } from 'app/const';
import { LockModuleForReviewComponent } from '../lock-module-for-review/lock-module-for-review.component';

@Component({
    selector: 'app-project-next-module',
    templateUrl: './project-next-module.component.html',
    entryComponents:[LockModuleForReviewComponent]
})
export class ProjectNextModuleEditComponent extends ProjectModuleDomain implements OnInit, OnDestroy {
    projectModules: any;
    currentProjectmoduleRecord:any;
    isVisibleReadOnlyText:boolean;
    nextProjectModule: any
    showNextBtnComponent: boolean = false;
    @Input() projectModuleId: number;
    @Output('lockEvent') addLockEvent = new EventEmitter<boolean>();
    
    constructor(
        private projectService: ProjectsService, 
        private projectModuleService: ProjectModulesService, 
        private router: Router, 
        private popup:RxPopup,
        private toast:RxToast,
        private storage:RxStorage,
        private applicationBroadcaster: ApplicationBroadcaster) {
        super();

    }

    ngOnInit(): void {
        
        this.projectModuleService.search(true, { projectModuleId: this.projectModuleId }).subscribe(t => {
            
            this.projectModules = t["projectModules"];
            let currentProjectModule = this.projectModules.find(p => p.projectModuleId == this.projectModuleId);
            // this.currentProjectmodule=currentProjectModule;
            this.nextProjectModule = this.projectModules.find(p => p.moduleOrder == (currentProjectModule.moduleOrder + 1));
            if (!this.nextProjectModule) {
                this.nextProjectModule = new ProjectModule();
                this.nextProjectModule.templateModuleName = "Back to My Projects";
                this.nextProjectModule.projectId = currentProjectModule.projectId;
            }
            this.showNextBtnComponent = true;
        })
        var localData = this.storage.local.get('data');
        
        this.projectModuleService.search(false,[{ "userId": localData.userId, "projectModuleId": this.projectModuleId }]).subscribe(
            (res)=>{
                if (res["projectModules"] && res["projectModules"].length > 0) {
                    this.currentProjectmoduleRecord = res["projectModules"][0];
                    if (this.currentProjectmoduleRecord.isClosed || this.currentProjectmoduleRecord.projectStatus) {
                        this.isVisibleReadOnlyText = true;
                    }
                }  
            },
            (error)=>{

            }
        )
    }

    redirectlink(next,current) {
        if (next.projectModuleId > 0)
        {
            if(this.isVisibleReadOnlyText)
            {
                this.router.navigate([next.uri]);
            }
            else
            {
                this.popup.show(LockModuleForReviewComponent,{next:next , current:current}).then(
                    (res:ProjectModule)=>{
                        this.projectModuleService.put(res).subscribe(
                            t => {
                            this.currentProjectmoduleRecord.status = t.status;
                            this.addLockEvent.emit(t.status);
                            this.applicationBroadcaster.allTypeBroadCast({ action: IS_MODULE_LOCK.action, value: this.projectModuleId });
                            this.router.navigate([next.uri]);
                            },
                            error => {
                                this.toast.show(error, { status: 'error' });
                            }
                        )
                        
                    },
                    (error)=>{
                        console.log("error from then block",error);
                    }
                ).catch(
                    (res)=>{
                        console.log("response/error from catch block",res);
                    }
                );
            }
        }
        else 
        {
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnDestroy(): void {
        super.destroy();
    }
}
