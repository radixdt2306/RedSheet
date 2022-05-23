import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { ProjectModule, vProjectModuleRecord, vProjectRecord, } from 'app/database-models';

import { } from 'app/lookups';
import { ProjectModulesService } from '../project-modules.service';
import { ProjectModuleDomain } from '../domain/project-module.domain';
import { ProjectModuleLookupGroup } from '../domain/project-module.models';
import { debounce } from 'rxjs/operator/debounce';
import { ProjectModuleHelpDetailComponent } from 'app/components/project-module/project-modules/ModuleHelp/detail/project-module-help-detail.component';


import { user } from "@rx/security";
import { ProjectsService } from 'app/components/project/projects/projects.service';
import { IS_MODULE_LOCK } from 'app/const';
import { ApplicationBroadcaster } from '@rx/core';


@Component({
    selector: 'app-project-module-edit',
    templateUrl: './project-module-edit.component.html',
    entryComponents: [RxMessageComponent, ProjectModuleHelpDetailComponent,]
})
export class ProjectModuleEditComponent extends ProjectModuleDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectModuleFormGroup: FormGroup;
    editSubscription: Subscription;
    projectModuleLookupGroup: ProjectModuleLookupGroup;;
    projectModuleRecord: any;
    userId: number;
    projectId: number;
    isProjectCompleted: boolean;
    isAssignee: boolean = false;
    isReviewer: boolean = false;
    isOwner: boolean = false;
    isVisibleReadOnlyText: boolean = false;
    @Input() projectModuleId: number;
    @Output('lockEvent') addLockEvent = new EventEmitter<boolean>();
    //@Output('roleRights') roleRights = new EventEmitter<boolean>();
    constructor(
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectModulesService: ProjectModulesService,
        private dialog: RxDialog,
        private componentFactoryResolver: ComponentFactoryResolver,
        private popup: RxPopup,
        private projectsService: ProjectsService,
        private applicationBroadcaster: ApplicationBroadcaster,
    ) {
        super();
        //this.popup.setComponent(componentFactoryResolver);
    }

    ngOnInit(): void {
        this.userId = user.data.userId;
        // this.projectModulesService.getBy([this.projectModuleId]).subscribe(
        //     (response: vProjectModuleRecord) => {
        //         ;
        //         this.projectModuleRecord = response;
        //         this.projectId = response.projectId;
        //         if(this.projectModuleRecord.note == null  || this.projectModuleRecord.note == "")
        //         {
        //             this.projectModuleRecord.note = "none.";
        //         }
        //         this.addLockEvent.emit(response.status || response.isClosed);
        //         this.projectsService.getBy([this.projectId]).subscribe(
        //             (response: vProjectRecord) => {
        //                 ;
        //                 console.log(response.isClosed);
        //                 this.isProjectCompleted = response.status;
        //                 this.showComponent = true;
        //             });

        //         //this.showComponent = true;
        //     });
        
        this.projectModulesService.search(false, [{ "userId": this.userId, "projectModuleId": this.projectModuleId }]).subscribe(
            (response: any) => {
                
                if (response["projectModules"] && response["projectModules"].length > 0) {

                    this.projectModuleRecord = response["projectModules"][0];
                    

                    this.projectId = this.projectModuleRecord.projectId;
                    this.isAssignee = this.projectModuleRecord.isAssignee;
                    this.isReviewer = this.projectModuleRecord.isReviewer;
                    this.isOwner = this.projectModuleRecord.isOwner;
                    if (this.projectModuleRecord.note == null || this.projectModuleRecord.note == "") {
                        this.projectModuleRecord.note = "none.";
                    }
                    // if (!this.isOwner) {
                    //     this.addLockEvent.emit(this.projectModuleRecord.status || this.projectModuleRecord.isClosed || this.isReviewer || !this.isAssignee);
                    // }
                    if (!this.isOwner) {
                        if (this.isAssignee == false && this.isReviewer == false) {
                            this.addLockEvent.emit(true);
                        }
                        else if (this.projectModuleRecord.isClosed == true) {
                            this.addLockEvent.emit(true);
                        }
                        else if (this.isReviewer == this.isAssignee && this.projectModuleRecord.status == false && this.projectModuleRecord.isClosed == false) {
                            this.addLockEvent.emit(false);
                        }
                        else if (this.isReviewer && this.projectModuleRecord.isClosed == true) {
                            this.addLockEvent.emit(true);
                        }
                        else if (this.isReviewer && this.projectModuleRecord.isClosed == false) {
                            this.addLockEvent.emit(true);
                        }
                        else if (this.isAssignee && this.projectModuleRecord.status == false) {
                            this.addLockEvent.emit(false);
                        }
                        else if (this.isAssignee && this.projectModuleRecord.status == true) {
                            this.addLockEvent.emit(true);
                        }
                    }
                    else {

                        this.addLockEvent.emit(this.projectModuleRecord.status || this.projectModuleRecord.isClosed || this.projectModuleRecord.projectStatus);
                    }

                    //for role rights

                    //this.addLockEvent.emit(this.projectModuleRecord.status || this.projectModuleRecord.isClosed);
                    // this.roleRights.emit(this.isReviewer);
                    this.isProjectCompleted = this.projectModuleRecord.projectStatus;
                    
                    if (this.projectModuleRecord.isClosed || this.projectModuleRecord.projectStatus) {
                        this.isVisibleReadOnlyText = true;
                    }
                    this.showComponent = true;
                }
            })
    }

    showProjectModuleHelpDetailComponent(): void {
        this.popup.show(ProjectModuleHelpDetailComponent, { HTMLHelp: this.projectModuleRecord.htmlHelp }).then(t => this.ngOnInit());
    }

    getIconClass(TemplateModuleId): string {

        let iconClass: string;
        switch (TemplateModuleId) {
            case 38:
                iconClass = "redsheet redsheet-background  text-muted";
                break;
            case 39:
                iconClass = "fa fa-users  text-muted";
                break;
            case 40:
                iconClass = "redsheet redsheet-culture text-muted";
                break;
            case 41:
                iconClass = "redsheet redsheet-negotionality text-muted";
                break;
            case 42:
                iconClass = "redsheet redsheet-this-negotiation text-muted";
                break;
            case 43:
                iconClass = "redsheet redsheet-power text-muted";
                break;
            case 44:
                iconClass = "redsheet redsheet-game text-muted";
                break;
            case 45:
                iconClass = "redsheet redsheet-requirement text-muted";
                break;
            case 46:
                iconClass = "redsheet redsheet-their-requirement text-muted";
                break;
            case 47:
                iconClass = "redsheet redsheet-culture-plan text-muted";
                break;
            case 48:
                iconClass = "redsheet redsheet-preparation text-muted";
                break;
            case 49:
                iconClass = "redsheet redsheet-event-timeline text-muted";
                break;
            case 50:
                iconClass = "redsheet redsheet-post-event-action text-muted";
                break;
            case 51:
                iconClass = "redsheet redsheet-outcomes-and-learning text-muted";
                break;
            case 52:
                iconClass = "redsheet redsheet-background text-muted";
                break;
            case 53:
                iconClass = "redsheet redsheet-meeting-management text-muted";
                break;
            case 54:
                iconClass = "redsheet redsheet-this-negotiation text-muted";
                break;
            case 55:
                iconClass = "redsheet redsheet-meeting-management text-muted";
                break;
            default:
                iconClass = "";
        }
        return iconClass;

    }


    editProjectModule(isLock: boolean): void {
        debugger;
        var projectModule = new ProjectModule(this.projectModuleRecord);
        projectModule.status = isLock;
        projectModule.hTMLHelp = this.projectModuleRecord.htmlHelp;
        projectModule.baseId = this.projectModuleRecord.baseId;
        projectModule.dependantModuleId = this.projectModuleRecord.dependantModuleId;
        projectModule.isVisited = this.projectModuleRecord.isVisited;

        this.editSubscription = this.projectModulesService.put(projectModule).subscribe(t => {
            this.projectModuleRecord.status = t.status;
            this.addLockEvent.emit(isLock);
            this.applicationBroadcaster.allTypeBroadCast({ action: IS_MODULE_LOCK.action, value: this.projectModuleId });
        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectModuleFormGroup.dirty;
    }

    getSymbol(TemplateModuleId): string {
        let iconClass: string;
        if (TemplateModuleId == 41 || TemplateModuleId == 45 || TemplateModuleId == 46) {
            return iconClass = "sup fa fa-registered";
        }
        else {
            return iconClass = "";
        }

    }



    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }
}
