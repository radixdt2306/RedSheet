import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick } from '@rx/view';


import { Project, vUserLookup, } from 'app/database-models';
import { ProjectsService } from '../projects.service';
import { ProjectDomain } from '../domain/project.domain';
import { ApplicationBroadcaster } from '@rx/core';
import { HIDE_SIDE_BAR } from 'app/const';
import { ProjectNegotionalityLookups } from 'app/lookups';
import { ProjectLookupGroup } from '../domain/project.models';
import { RxSpinner } from "@rx/view";
import { API_HOST_URI } from "@rx";

@Component({
    templateUrl: './project-list.component.html',
})
export class ProjectListComponent extends ProjectDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    //projects: Project[];
    projects: any;
    listSubscription: Subscription;
    projectLookupGroup: ProjectLookupGroup;
    users: vUserLookup[];
    project: any;
    sortClass: string;
    isDesc: boolean;
    selectedMenue : boolean = false;
    flagmenu = false;

    constructor(
        @Inject(RxSpinner) private spinner: RxSpinner,
        applicationBroadcaster: ApplicationBroadcaster,
        private projectsService: ProjectsService,
        private dialog: RxDialog,
        private router: Router,
        @Inject(API_HOST_URI) private hostUri: string,
        private projectService: ProjectsService
    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(HIDE_SIDE_BAR);
    }

    ngOnInit(): void {

        this.project = new Project();
        this.sortClass = "fa fa fa-long-arrow-down pl-2";
        this.isDesc = false;
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        this.listSubscription = this.projectsService.search({ isMyProjects: false }).subscribe(result => {
            this.projectsService.lookup([ProjectNegotionalityLookups.userLookups]).then((response: ProjectLookupGroup) => {
                this.users = response.userLookups;
            });
            var count = 0;
            if (result.projects) {
                result.projects.forEach(tt => {
                    tt.rowIndex = count;
                    count++;
                });
                this.projects = result.projects;
                if (this.projects) {
                    for (var j: number = 0; j < this.projects.length; j++) {
                        this.projects[j]["hideDropDown"] = false;
                        this.projects[j]["userId"] = this.projects[j].ownerId;
                    }
                    // this.projects[0]['isStageReached'] = true
                    // this.projects[1]['isStageReached'] = true

                    // if(this.projects.length >1)
                    // {
                    //     this.projects[0]['isStageReached'] = true
                    //     this.projects[1]['isStageReached'] = true
                    // }
                    // else
                    // {
                    //     this.projects[0]['isStageReached'] = true
                    // }
                    this.projects.sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime());
                }
            }
            else {
                this.projects = [];
            }
            this.showComponent = true;
        });

    }

    sortData(): void {
        if (this.isDesc) {
            this.isDesc = !this.isDesc;
            this.sortClass = "fa fa fa-long-arrow-down pl-2";
            this.projects.sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime());
            //    if(this.projects.length >1)
            //     {
            //         this.projects[0]['isStageReached'] = true
            //         this.projects[1]['isStageReached'] = true
            //     }
            //     else
            //     {
            //         this.projects[0]['isStageReached'] = true
            //     }
        }
        else {
            this.isDesc = !this.isDesc;
            this.sortClass = "fa fa fa-long-arrow-up pl-2";
            this.projects.sort((a, b) => new Date(a.updatedOn).getTime() - new Date(b.updatedOn).getTime());
            // if(this.projects.length >1)
            // {
            //     this.projects[0]['isStageReached'] = true
            //     this.projects[1]['isStageReached'] = true
            // }
            // else
            // {
            //     this.projects[0]['isStageReached'] = true
            // }
        }
    }
    // checkStageReachedStatus():void
    // {
    //
    //     if(this.projects.length >1)
    //         {
    //             this.projects[0]['isStageReached'] = true
    //             this.projects[1]['isStageReached'] = true
    //         }
    //         else
    //         {
    //             this.projects[0]['isStageReached'] = true
    //         }
    // }

    removeMenu(){
        if(this.flagmenu){
            this.flagmenu = false;
        }
        else{
            this.selectedMenue = false;
        }
    }

    closeProject(project: Project): void {
        project.status = project['projectStatus'];
        project.isClosed = true;
        this.dialog.confirmation([project.projectName], "close").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                project.isClosed = true;
                this.projectsService.put(project).subscribe(t => {
                    this.ngOnInit();
                }, error => {
                });
            }
            else {
                project.isClosed = false;
            }
        });
    }

    activeProject(project: Project): void {
        project.status = project['projectStatus'];
        this.dialog.confirmation([project.projectName], "reactive").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                project.isClosed = false;
                project.status = false;
                this.projectService.put(project).subscribe(t => {
                    this.ngOnInit();
                }, error => {

                });
            }
            else {
                project.isClosed = true;
                project.status = true;
            }
        });
    }

    liveProject(project: Project): void {
        this.dialog.confirmation([project.projectName], "share").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                project.status = true;
                this.projectsService.put(project).subscribe(t => {
                    project.isClosed = true;
                    this.ngOnInit();
                }, error => {

                });
            }
            else {
                project.isClosed = false;
            }
        });
    }

    showDropDown(project: Project): void {
        let index = this.projects.findIndex(t => t.projectId == project.projectId);
        
        this.projects.forEach(element => {
            element["hideDropDown"] = false;
        });
        this.projects[index]["hideDropDown"] = true;
        this.selectedMenue = true;
        this.flagmenu = true;
    }

    changeOwnership(project: Project, userId: number): void {
        project.ownerId = userId;
        project.status = true;
        // project.isClosed = false;
        this.projectsService.put(project).subscribe(t => {
            let index = this.projects.findIndex(t => t.projectId == project.projectId);
            this.projects[index]["hideDropDown"] = false;
            this.ngOnInit();
        }, error => {
        });
    }

    navigateTo(navigateUrl): void {
        this.router.navigate([navigateUrl]);
    }

    getIconClass(TemplateModuleId): string {

        let iconClass: string;
        switch (TemplateModuleId) {
            case 38:
                iconClass = "redsheet redsheet-background  fa-4x";
                break;
            case 39:
                iconClass = "fa fa-users  fa-4x";
                break;
            case 40:
                iconClass = "redsheet redsheet-culture fa-4x";
                break;
            case 41:
                iconClass = "redsheet redsheet-negotionality  fa-4x";
                break;
            case 42:
                iconClass = "redsheet redsheet-this-negotiation fa-4x";
                break;
            case 43:
                iconClass = "redsheet redsheet-power fa-4x";
                break;
            case 44:
                iconClass = "redsheet redsheet-game fa-4x";
                break;
            case 45:
                iconClass = "redsheet redsheet-requirement fa-4x";
                break;
            case 46:
                iconClass = "redsheet redsheet-their-requirement fa-4x";
                break;
            // case 47:
            //     iconClass = "redsheet redsheet-requirement fa-4x";
            //     break;
            case 47:
                iconClass = "redsheet redsheet-culture-plan fa-4x";
                break;
            case 48:
                iconClass = "redsheet redsheet-preparation fa-4x";
                break;
            case 49:
                iconClass = "redsheet redsheet-event-timeline fa-4x";
                break;
            case 50:
                iconClass = "redsheet redsheet-post-event-action fa-4x";
                break;
            case 51:
                iconClass = "redsheet redsheet-outcomes-and-learning fa-4x";
                break;
            case 52:
                iconClass = "redsheet redsheet-background fa-4x";
                break;
            case 53:
                iconClass = "redsheet redsheet-meeting-management fa-4x";
                break;
            case 54:
                iconClass = "redsheet redsheet-this-negotiation fa-4x";
                break;
            case 55:
                iconClass = "redsheet redsheet-meeting-management fa-4x";
                break;
            default:
                iconClass = "";
        }
        return iconClass;

    }

    reset(): void {
        this.project.projectName = "";
        this.project.ownerName = "";
        this.project.myRole = "";
        this.project.status = "";
        //this.ngOnInit();
    }

    getSymbol(templateModuleId): string {
        let iconClass: string;
        if (templateModuleId == 41 || templateModuleId == 45 || templateModuleId == 46) {
            return iconClass = "sup color-blue-gray fa fa-registered";
        }
        else {
            return iconClass = "";
        }

    }

    exportHtmlToPdf(project: Project): void {
        project.status = true;
        this.dialog.confirmation([project.projectName], "download").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.spinner.show();
                window.location.href = this.hostUri + 'api/ExportReportPDFs/exportHtmlToPdf?projectId=' + project.projectId;
                window.setTimeout(() => { this.spinner.hide(); }, 8000);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.listSubscription)
            this.listSubscription.unsubscribe();
        super.destroy();
    }

    onMarkActive(project: any): void {
        project.status = project['projectStatus'];
        this.dialog.confirmation([project.projectName], "reactive").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                
                project.isClosed = false;

                this.projectsService.put(project).subscribe(t => {
                    
                    this.ngOnInit();
                }, error => {
                });
            }
            else {
                project.isClosed = true;
            }
        });
    }

    deleteProject(project: Project): void {
        this.dialog.confirmation([project.projectName], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.projectsService.delete(project.projectId).subscribe(t => {
                    this.ngOnInit();
                }, error => {
                });
            }
        });
    }

    onCreateCopy(project) {
        this.dialog.confirmation([project.projectName], "copy").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.spinner.show();
                this.projectService.createCopy(project.projectId).subscribe(t => {
                    this.spinner.hide();
                    this.router.navigate(['/project/projects', t])
                }, error => {
                    this.spinner.hide();
                });
            }
        });
    }
}
