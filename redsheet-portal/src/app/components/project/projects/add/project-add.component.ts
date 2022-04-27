import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ComponentCanDeactivate, ApplicationBroadcaster } from "@rx/core";
import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { Project, ProjectModule, ProjectModuleAssignee, ProjectModuleReviewer, ProjectNegotiation, vUserLookup, vTemplateGroup, } from 'app/database-models';

import { ProjectNegotionalityLookups, ProjectLookups } from 'app/lookups';
import { ProjectsService } from '../projects.service';
import { ProjectDomain } from '../domain/project.domain';
import { ProjectLookupGroup } from '../domain/project.models';

import { user } from "@rx/security";

import { HIDE_SIDE_BAR } from 'app/const';
import { ApplicationServicesService } from 'app/components/project/projects/application-services.service';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { TemplateModuleAddComponent } from 'app/components/project/template-modules/add/template-module-add.component';
import { forEach } from '@angular/router/src/utils/collection';
import { NEGOTIATION_ROLES } from '../../../../database-collections';


@Component({
    templateUrl: './project-add.component.html',
    entryComponents: [RxMessageComponent, TemplateModuleAddComponent]
})
export class ProjectAddComponent extends ProjectDomain implements OnInit, OnDestroy, ComponentCanDeactivate {
    showComponent: boolean = false;
    projectFormGroup: FormGroup;
    addSubscription: Subscription;
    projectLookupGroup: ProjectLookupGroup;;
    projectNote: string;
    reporteeName: string;
    templateModules: any = [];
    templateItems: any = [];
    currentTemplate: any = {};
    templates: any = [];
    isAllowCustomization: boolean;
    users: vUserLookup[];
    templateGroups: vTemplateGroup[];
    private negotiation_roles: any;
    constructor(
        applicationBroadcaster: ApplicationBroadcaster,
        private validation: RxValidation,
        private router: Router,
        private toast: RxToast,
        private projectsService: ProjectsService,
        private applicationService: ApplicationServicesService,
        private popup: RxPopup,
        private componentResolver: ComponentFactoryResolver

    ) {
        super();
        applicationBroadcaster.allTypeBroadCast(HIDE_SIDE_BAR);
        this.popup.setComponent(componentResolver);
    }


    showEdit(templateModule: any) {
        document.body.className = "modal-open";
        this.popup.show(TemplateModuleAddComponent, { templateModule: templateModule, projectNote: this.projectNote, isAllowCustomization: this.isAllowCustomization }).then(t => this.ngOnInit());
    }
    ngOnInit(): void {
        this.negotiation_roles = NEGOTIATION_ROLES;
        this.projectsService.lookup([ProjectNegotionalityLookups.userLookups, ProjectLookups.templateGroups]).then((response: ProjectLookupGroup) => {
            this.users = response.userLookups;
            this.projectLookupGroup = new ProjectLookupGroup();
            this.projectLookupGroup.templateGroups = response.templateGroups;
            this.projectLookupGroup.project = new Project();
            if (this.projectFormGroup == undefined) {
                this.projectFormGroup = this.validation.getFormGroup(this.projectLookupGroup.project);
                this.projectFormGroup.controls.ownerId.setValue(1);
            }
            else {
                this.selectTemplate(false);
            }
            this.showComponent = true;
        })

    }
    selectTemplateGroup(templateGroupId: string) {
        this.applicationService.getProjectTemplates([templateGroupId]).subscribe(t => {
            this.templates = t;
            if (this.templates.length == 1) {
                this.projectFormGroup.controls.templateId.setValue(this.templates[0].id);
                this.selectTemplate(true);
            }
            else
                this.selectTemplate(false);
        })
        this.projectFormGroup.controls.templateId.setValue(undefined);
        this.templateModules = null;
    }

    selectTemplate(isAdd: Boolean) {
        if (isAdd) {
            let templateId = this.projectFormGroup.value["templateId"];
            this.currentTemplate = this.templates.where(t => t.id == templateId)[0];
            this.isAllowCustomization = this.currentTemplate.allowCustomization;
            this.projectFormGroup.controls.isAllowCustomization.setValue(this.isAllowCustomization);
            this.projectFormGroup.controls.templateName.setValue(this.currentTemplate.name);
            this.templateModules = this.currentTemplate.modules;
            this.projectFormGroup.controls.templateName.setValue(this.currentTemplate.name);
            this.projectNote = (this.currentTemplate.notes && this.currentTemplate.notes.length > 0) ? this.currentTemplate.notes[0] : "";
            // let reportees:string = '';
            // for(let l=0; l < this.currentTemplate.reportees.length; l++)
            // reportees += ", " + this.currentTemplate.reportees[l].forename + ' ' + this.currentTemplate.reportees[l].surname;
            //     if(reportees.length > 0)
            //         reportees = reportees.slice(1);
            //     else
            //         reportees = null;
            //this.reporteeName = ( this.currentTemplate.reportees   && this.currentTemplate.reportees.length > 0)? this.currentTemplate.reportees.join(", ") : "";
            //this.reporteeName = reportees;
            this.projectFormGroup.controls.projectNote.setValue(this.projectNote);
            //this.projectFormGroup.controls.reporteeName.setValue(this.reporteeName);
        }
        let notes: string = '';
        if (this.templateModules != null) {
            for (let i = 0; i < this.templateModules.length; i++) {
                let moduleItem = this.templateModules[i];
                this.bindIcons(moduleItem, moduleItem.controllerName);
                moduleItem['ownerNote'] = this.templateModules[i]['ownerNote'];

                if (isAdd) {
                    for (let l = 0; l < moduleItem.notes.length; l++)
                        notes += ", " + moduleItem.notes[l].note;
                    if (notes.length > 0)
                        moduleItem['ownerNote'] = notes.slice(1);
                    else
                        moduleItem['ownerNote'] = null;
                }
                let collabrators: string = '', assignee: string = '';
                for (let j = 0; j < moduleItem.reviewers.length; j++) {
                    moduleItem.reviewers[j]['isChecked'] = true
                    let name: string = moduleItem.reviewers[j].forename + " " + moduleItem.reviewers[j].surname;
                    assignee += ", " + moduleItem.reviewers[j].forename + " " + moduleItem.reviewers[j].surname;
                }
                if (assignee.length > 0)
                    moduleItem['assignee'] = assignee.slice(1);
                else
                    moduleItem['assignee'] = "none.";
                for (let k = 0; k < moduleItem.assignedUsers.length; k++) {
                    moduleItem.assignedUsers[k]['isChecked'] = true
                    let name: string = moduleItem.assignedUsers[k].forename + " " + moduleItem.assignedUsers[k].surname;
                    collabrators += ", " + moduleItem.assignedUsers[k].forename + " " + moduleItem.assignedUsers[k].surname;
                }
                if (collabrators.length > 0)
                    moduleItem['collabrators'] = collabrators.slice(1);
                else
                    moduleItem['collabrators'] = "none.";
            }
        }
    }

    addProject(): void {
        let jObject: Project = this.projectFormGroup.value;
        jObject.projectNote = this.projectNote;
        if (this.templateModules != null && this.templateModules.length > 0) {
            var projectModules = new Array<ProjectModule>()
            this.templateModules.forEach(t => {
                var projectModule = new ProjectModule();
                if (t.htmlHelp) {
                    if (t.htmlHelp.helpItems.length > 0)
                        projectModule.hTMLHelp = t.htmlHelp.helpItems[0].content;
                    else
                        projectModule.hTMLHelp = "none";
                }
                else
                    projectModule.hTMLHelp = "none";
                projectModule.moduleOrder = t.order;
                if (projectModule.moduleOrder == 1) {
                    projectModule.status = false;

                }
                else {
                    projectModule.status = true;

                }
                projectModule.isClosed = false;

                if (t.note == null || t.note == "")
                    projectModule.note = null;
                else
                    projectModule.note = t.notes.join(" ");
                projectModule.templateModuleId = this.gettemplateIdFromControllerName(t.controllerName);
                projectModule.templateModuleName = (t.displayName) ? t.displayName : t.name;
                projectModule.createdOn = new Date();
                projectModule.createdBy = user.data.userId;
                projectModule.updatedOn = new Date();
                projectModule.updatedBy = user.data.userId;
                projectModule.projectModuleAssignees = [];
                projectModule.projectModuleReviewers = [];
                projectModule.ownerNote = t.ownerNote;
                projectModule.baseId = t.baseId;
                if (t.dependecies.productModuleId > 0)
                    projectModule.dependantModuleId = t.dependecies.productModuleId[0];
                else
                    projectModule.dependantModuleId = 0;
                projectModule.isVisited = false;
                let userId: number = 0;
                t.assignedUsers.forEach(a => {
                    var projectModuleAssignee = new ProjectModuleAssignee();
                    var userData: any = this.users.where(u => u.email.toLowerCase() == a.email.toLowerCase()).singleOrDefault();
                    if (userData)
                        userId = userData.userId;
                    else
                        userId = 0;

                    projectModuleAssignee.projectModuleId = 0;
                    projectModuleAssignee.userId = userId;
                    projectModule.projectModuleAssignees.push(projectModuleAssignee);
                })
                t.reviewers.forEach(a => {
                    var userData: any = this.users.where(u => u.email.toLowerCase() == a.email.toLowerCase()).singleOrDefault();
                    if (userData)
                        userId = userData.userId;
                    else
                        userId = 0;
                    var projectModuleReviewers = new ProjectModuleReviewer();
                    projectModuleReviewers.userId = userId;
                    projectModuleReviewers.projectModuleId = 0;
                    projectModule.projectModuleReviewers.push(projectModuleReviewers);
                })
                projectModules.push(projectModule)
            })
            jObject.projectModules = projectModules;
        }
        this.addSubscription = this.projectsService.post(jObject).subscribe(t => {
            this.router.navigate(['dashboard']);
        },
            error => {
                this.toast.show(error, { status: 'error' });
            })
    }

    bindIcons(moduleItem: ProjectModule, templateModuleName: string): void {
        switch (templateModuleName.toLowerCase()) {
            case "ctrl_backgroundtonegotiation":
                moduleItem['iconClass'] = "redsheet redsheet-background";
                break;
            case "ctrl_stakeholders":
                moduleItem['iconClass'] = "fa fa-users";
                break;
            case "ctrl_culture":
                moduleItem['iconClass'] = "redsheet redsheet-culture";
                break;
            case "ctrl_negotionality":
                moduleItem['iconClass'] = "redsheet redsheet-negotionality";
                break;
            case "ctrl_thisnegotiation":
                moduleItem['iconClass'] = "redsheet redsheet-this-negotiation";
                break;
            case "ctrl_power":
                moduleItem['iconClass'] = "redsheet redsheet-power";
                break;
            case "ctrl_game":
                moduleItem['iconClass'] = "redsheet redsheet-game";
                break;
            case "ctrl_negotiables":
                moduleItem['iconClass'] = "redsheet redsheet-requirement";
                break;
            case "ctrl_theirnegotiables":
                moduleItem['iconClass'] = "redsheet  redsheet-their-requirement";
                break;
            case "ctrl_cultureplan":
                moduleItem['iconClass'] = "redsheet redsheet-culture-plan";
                break;
            case "ctrl_preparation":
                moduleItem['iconClass'] = "redsheet redsheet-preparation";
                break;
            case "ctrl_negotiationeventtimeline":
                moduleItem['iconClass'] = "redsheet redsheet-event-timeline";
                break;
            case "ctrl_posteventactions":
                moduleItem['iconClass'] = "redsheet redsheet-post-event-action";
                break;
            case "ctrl_outcomeslearning":
                moduleItem['iconClass'] = "redsheet redsheet-outcomes-and-learning";
                break;
            case "ctrl_backgroundtonegotiation_lite":
                moduleItem['iconClass'] = "redsheet redsheet-background";
                break;
            case "ctrl_meetingmanagement_lite":
                moduleItem['iconClass'] = "redsheet redsheet-meeting-management";
                break;
            case "ctrl_scopetonegotiateandobjectives_lite":
                moduleItem['iconClass'] = "redsheet redsheet-this-negotiation";
                break;
            case "ctrl_negotiationplan_lite":
                moduleItem['iconClass'] = "redsheet redsheet-meeting-management";
                break;
            default:
                moduleItem['iconClass'] = "redsheet redsheet-background";
                break;
        }
    }

    gettemplateIdFromControllerName(controllerName): number {
        let templateId: number;
        switch (controllerName.toLowerCase()) {
            case "ctrl_backgroundtonegotiation":
                templateId = 38;
                break;
            case "ctrl_stakeholders":
                templateId = 39;
                break;
            case "ctrl_culture":
                templateId = 40;
                break;
            case "ctrl_negotionality":
                templateId = 41;
                break;
            case "ctrl_thisnegotiation":
                templateId = 42;
                break;
            case "ctrl_power":
                templateId = 43;
                break;
            case "ctrl_game":
                templateId = 44;
                break;
            case "ctrl_negotiables":
                templateId = 45;
                break;
            // case "ctrl_concessionstrategy":
            //     templateId = 46;
            //     break;
            case "ctrl_theirnegotiables":
                templateId = 46;
                break;
            case "ctrl_cultureplan":
                templateId = 47;
                break;
            case "ctrl_preparation":
                templateId = 48;
                break;
            case "ctrl_negotiationeventtimeline":
                templateId = 49;
                break;
            case "ctrl_posteventactions":
                templateId = 50;
                break;
            case "ctrl_outcomeslearning":
                templateId = 51;
                break;
            case "ctrl_backgroundtonegotiation_lite":
                templateId = 52;
                break;
            case "ctrl_meetingmanagement_lite":
                templateId = 53;
                break;
            case "ctrl_scopetonegotiateandobjectives_lite":
                templateId = 54;
                break;
            case "ctrl_negotiationplan_lite":
                templateId = 55;
                break;
            default:
                templateId = 0;
        }
        return templateId;

    }

    getIconClass(controllerName): string {

        let iconClass: string;
        switch (controllerName.toLowerCase()) {
            case "ctrl_backgroundtonegotiation":
                iconClass = "redsheet redsheet-background";
                break;
            case "ctrl_stakeholders":
                iconClass = "fa fa-users";
                break;
            case "ctrl_culture":
                iconClass = "redsheet redsheet-culture";
                break;
            case "ctrl_negotionality":
                iconClass = "redsheet redsheet-negotionality";
                break;
            case "ctrl_thisnegotiation":
                iconClass = "redsheet redsheet-this-negotiation";
                break;
            case "ctrl_power":
                iconClass = "redsheet redsheet-power";
                break;
            case "ctrl_game":
                iconClass = "redsheet redsheet-game";
                break;
            case "ctrl_negotiables":
                iconClass = "redsheet redsheet-requirement";
                break;
            // case "ctrl_concessionstrategy":
            //     iconClass= "redsheet redsheet-requirement";
            //     break;
            case "ctrl_theirnegotiables":
                iconClass = "redsheet redsheet-their-requirement";
                break;
            case "ctrl_cultureplan":
                iconClass = "redsheet redsheet-culture-plan";
                break;
            case "ctrl_preparation":
                iconClass = "redsheet redsheet-preparation";
                break;
            case "ctrl_eventtimeline":
                iconClass = "redsheet redsheet-event-timeline";
                break;
            case "ctrl_posteventactions":
                iconClass = "redsheet redsheet-post-event-action";
                break;
            case "ctrl_outcomeslearning":
                iconClass = "redsheet redsheet-outcomes-and-learning";
                break;
            case "ctrl_backgroundtonegotiation_lite":
                iconClass = "redsheet redsheet-background";
                break;
            case "ctrl_meetingmanagement_lite":
                iconClass = "redsheet redsheet-meeting-management";
                break;
            case "ctrl_scopetonegotiateandobjectives_lite":
                iconClass = "redsheet redsheet-this-negotiation";
                break;
            case "ctrl_negotiationplan_lite":
                iconClass = "redsheet redsheet-meeting-management";
                break;
            default:
                iconClass = "";
        }
        return iconClass;

    }

    getSymbol(templateModuleId): string {
        let iconClass: string;
        if (templateModuleId == 34 || templateModuleId == 40 || templateModuleId == 38 || templateModuleId == 50 || templateModuleId == 49) {
            return iconClass = "sup color-blue-gray fa fa-registered";
        }
        else {
            return iconClass = "";
        }

    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectFormGroup.dirty;
    }

    ngOnDestroy(): void {
        if (this.addSubscription)
            this.addSubscription.unsubscribe();
        super.destroy();
    }

}
