import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { RxMessageComponent } from '@rx/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { RxToast, RxDialog, DialogClick, RxPopup } from '@rx/view';
import { RxValidation } from '@rx/forms';
import { Project, vProjectRecord, ProjectModule, vUserLookup, TemplateGroup, vTemplateGroup, vTemplateGroupRecord, User, } from 'app/database-models';

import { ProjectNegotiationLookups, ProjectNegotionalityLookups, ProjectLookups } from 'app/lookups';
import { ProjectsService } from '../projects.service';
import { ProjectDomain } from '../domain/project.domain';
import { ProjectLookupGroup } from '../domain/project.models';
import { ApplicationServicesService } from 'app/components/project/projects/application-services.service';
import { TemplateModuleEditComponent } from 'app/components/project/template-modules/edit/template-module-edit.component';
import { TemplateGroupEnum } from 'app/enums/template-group';
import { user } from '@rx/security';
import { NEGOTIATION_ROLES } from '../../../../database-collections';
import { TagModel } from "@rx/forms";
import { ProjectModuleAssigneesOrReviewer } from 'app/database-models/project-module-assignees-or-reviewer';
import { RxSpinner } from "@rx/view";

@Component({
    templateUrl: './project-edit.component.html',
    entryComponents: [RxMessageComponent, TemplateModuleEditComponent]
})
export class ProjectEditComponent extends ProjectDomain implements OnInit, OnDestroy {
    showComponent: boolean = false;
    projectFormGroup: FormGroup;
    editSubscription: Subscription;
    projectLookupGroup: ProjectLookupGroup;
    templates: any[];
    isAllowCustomization: boolean;
    templateModules: ProjectModule[];
    projectId: number;
    templateGroupName: any;
    negotiationRoleName: any;
    private negotiation_roles: any;
    isAllowCustomizationForAllModules: boolean = false;
    users: any[];
    selectCollabrators: string = "";
    selectReviewers: string = "";
    collabaratorUsersSource: any[] = [];
    reviewerUsersSource: any[] = [];
    collabaratorUsers: any;
    reviewerUsers: any;

    constructor(
        @Inject(RxSpinner) private spinner: RxSpinner,
        private validation: RxValidation,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toast: RxToast,
        private projectsService: ProjectsService,
        private dialog: RxDialog,
        private popup: RxPopup,
        private componentResolver: ComponentFactoryResolver,
        private applicationService: ApplicationServicesService
    ) {
        super();
        activatedRoute.params.subscribe((param: any) => this.projectId = param['projectId']);
        this.popup.setComponent(componentResolver);
    }

    ngOnInit(): void {
        this.negotiation_roles = NEGOTIATION_ROLES;
        this.projectsService.getBy([this.projectId]).subscribe(a => {
            if (a.ownerId == user.data.userId) {
                this.projectsService.group([this.projectId], [ProjectNegotionalityLookups.userLookups,
                ProjectLookups.templateGroups,
                ProjectLookups.projectModuleAssigneesOrReviewerGroups]).then((response: ProjectLookupGroup) => {
                    this.projectLookupGroup = new ProjectLookupGroup();
                    this.projectLookupGroup.project = new Project(response.project);
                    this.projectLookupGroup.userLookups = response.userLookups;
                    this.projectLookupGroup.templateGroups = response.templateGroups;
                    
                    this.projectLookupGroup.project.projectModuleAssigneesOrReviewers = response.projectModuleAssigneesOrReviewerGroups.where(c => c.projectId == this.projectId);
                    this.collabaratorUsers = [];
                    this.reviewerUsers = [];
                    this.collabaratorUsersSource = [];
                    this.reviewerUsersSource = [];
                    this.templateGroupName = this.projectLookupGroup.templateGroups.where(a => a.templateGroupId == response.project.templateGroupId).select(a => a.templateGroupName)[0];
                    let negotiationRoleObject = this.negotiation_roles.where(t => t.negotiationRoleId == this.projectLookupGroup.project.negotiationRoleId);
                    this.negotiationRoleName = negotiationRoleObject[0].negotiationRoleName;
                    this.projectFormGroup = this.validation.getFormGroup(this.projectLookupGroup.project);

                    this.isAllowCustomizationForAllModules = this.projectFormGroup.value["isAllowCustomization"];
                    this.selectTemplate();

                    this.getApplicationUsers_ArrayOrCollabaratorAndReviewer();
                });
            }
            else {
                this.toast.show("You are not authorized to edit project", { status: 'error' });
                this.router.navigate(['dashboard']);
            }
        });
    }

    editProject(): void {
        this.editSubscription = this.projectsService.put(this.projectFormGroup.value).subscribe(t => {
            this.router.navigate(['dashboard']);
        },
            error => {
                this.toast.show(error, { status: 'error' });

            })
    }

    bindIcons(moduleItem: ProjectModule, templateModuleId: number): void {

        switch (templateModuleId) {
            case 38:
                moduleItem['iconClass'] = "redsheet redsheet-background";
                break;
            case 39:
                moduleItem['iconClass'] = "fa fa-users";
                break;
            case 40:
                moduleItem['iconClass'] = "redsheet redsheet-culture";
                break;
            case 41:
                moduleItem['iconClass'] = "redsheet redsheet-negotionality";
                break;
            case 42:
                moduleItem['iconClass'] = "redsheet redsheet-this-negotiation";
                break;
            case 43:
                moduleItem['iconClass'] = "redsheet redsheet-power";
                break;
            case 44:
                moduleItem['iconClass'] = "redsheet redsheet-game";
                break;
            case 45:
                moduleItem['iconClass'] = "redsheet redsheet-requirement";
                break;
            case 46:
                moduleItem['iconClass'] = "redsheet redsheet-their-requirement";
                break;
            case 47:
                moduleItem['iconClass'] = "redsheet redsheet-culture-plan";
                break;
            case 48:
                moduleItem['iconClass'] = "redsheet redsheet-preparation";
                break;
            case 49:
                moduleItem['iconClass'] = "redsheet redsheet-event-timeline";
                break;
            case 50:
                moduleItem['iconClass'] = "redsheet redsheet-post-event-action";
                break;
            case 51:
                moduleItem['iconClass'] = "redsheet redsheet-outcomes-and-learning";
                break;
            case 52:
                moduleItem['iconClass'] = "redsheet redsheet-background";
                break;
            case 53:
                moduleItem['iconClass'] = "redsheet redsheet-meeting-management";
                break;
            case 54:
                moduleItem['iconClass'] = "redsheet redsheet-this-negotiation";
                break;
            case 55:
                moduleItem['iconClass'] = "redsheet redsheet-meeting-management";
                break;
            default:
                moduleItem['iconClass'] = "redsheet redsheet-background";
                break;
        }
    }

    selectTemplate() {
        this.templateModules = this.projectLookupGroup.project.projectModules;
        let notes: string = '';
        for (let i = 0; i < this.templateModules.length; i++) {
            let moduleItem = this.templateModules[i];
            moduleItem['ownerNote'] = this.templateModules[i]['ownerNote'];
            let collabrators: string = '', assignee: string = '';
            this.bindIcons(moduleItem, moduleItem.templateModuleId);
            for (let j = 0; j < moduleItem.projectModuleAssignees.length; j++) {
                let assignedUser = moduleItem.projectModuleAssignees[j];
                assignedUser['isChecked'] = true;
                let userData: vUserLookup[] = this.projectLookupGroup.userLookups.where(a => a.userId == assignedUser.userId)
                if (userData != undefined && userData.length > 0) {
                    assignee += ", " + userData[0].userName;
                }
            }
            if (assignee.length > 0)
                moduleItem['assignee'] = assignee.slice(1);
            else
                moduleItem['assignee'] = "none.";
            for (let k = 0; k < moduleItem.projectModuleReviewers.length; k++) {
                let reviewUser = moduleItem.projectModuleReviewers[k];
                reviewUser['isChecked'] = true
                let userData: vUserLookup[] = this.projectLookupGroup.userLookups.where(a => a.userId == reviewUser.userId)
                if (userData != undefined && userData.length > 0) {
                    collabrators += ", " + userData[0].userName;
                }
            }
            if (collabrators.length > 0)
                moduleItem['collabrators'] = collabrators.slice(1);
            else
                moduleItem['collabrators'] = "none.";
        }
    }

    editTemplateModule(templateModule: any): void {
        document.body.className = "modal-open";
        this.popup.show(TemplateModuleEditComponent, { templateModule: templateModule, userLookups: this.projectLookupGroup.userLookups, projectNote: this.projectLookupGroup.project.projectNote, isAllowCustomization: this.projectFormGroup.value["isAllowCustomization"] })
            .then(t => this.ngOnInit());
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        return !this.projectFormGroup.dirty;
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

    ngOnDestroy(): void {
        if (this.editSubscription)
            this.editSubscription.unsubscribe();
        super.destroy();
    }

    getApplicationUsers_ArrayOrCollabaratorAndReviewer() {
        this.applicationService.getApplicationUsers().subscribe(response => {
            this.users = response;
            
            let projectModuleAssigneesOrReviewer = this.projectLookupGroup.project.projectModuleAssigneesOrReviewers;

            for (let index = 1; index <= 2; index++) {
                let projectModuleAssigneesOrReviewers = (index == 1 ? projectModuleAssigneesOrReviewer.where(c => c.isAssignee) :
                    projectModuleAssigneesOrReviewer.where(c => c.isReviewer));

                for (let i = 0; i < projectModuleAssigneesOrReviewers.length; i++) {
                    let currentProjectModuleAssignee = projectModuleAssigneesOrReviewers[i];

                    let isUserExist = this.projectLookupGroup.userLookups.where(a => a.userId == currentProjectModuleAssignee.userId)

                    if (isUserExist != undefined && isUserExist.length > 0) {
                        let userObjectAssigneeOrReviewer: any = {};

                        userObjectAssigneeOrReviewer['projectModuleAssigneesOrReviewerId'] = currentProjectModuleAssignee.projectModuleAssigneesOrReviewerId
                        userObjectAssigneeOrReviewer['projectId'] = currentProjectModuleAssignee.projectId
                        userObjectAssigneeOrReviewer['userId'] = currentProjectModuleAssignee.userId
                        userObjectAssigneeOrReviewer['isChecked'] = true
                        userObjectAssigneeOrReviewer['userName'] = isUserExist[0].userName;
                        userObjectAssigneeOrReviewer['email'] = isUserExist[0].email;
                        userObjectAssigneeOrReviewer['isAssignee'] = currentProjectModuleAssignee.isAssignee;
                        userObjectAssigneeOrReviewer['isReviewer'] = currentProjectModuleAssignee.isReviewer;

                        index == 1 ? this.collabaratorUsers.push(userObjectAssigneeOrReviewer) : this.reviewerUsers.push(userObjectAssigneeOrReviewer);
                    }
                }
            }

            for (let l = 0; l < this.users.length; l++) {
                let currentObject = this.users[l];

                var isExistCollabrators = this.collabaratorUsers.where(a => a.email == currentObject.email);
                if (isExistCollabrators.length == 0)
                    this.collabaratorUsersSource.push(this.users[l])

                var isExistReviewers = this.reviewerUsers.where(a => a.email == currentObject.email);
                if (isExistReviewers.length == 0)
                    this.reviewerUsersSource.push(this.users[l])
            }

            this.showComponent = true;
        })
    }

    itemAddedCollabratorOrReviewer(value: TagModel, assigneeOrReviewer: string) {
        
        let addObject = this.users.firstOrDefault(a => a.uniqueId == value.id);

        let isExist = assigneeOrReviewer == 'assignee' ? this.collabaratorUsers.where(a => a.uniqueId == value.id) :
            this.reviewerUsers.where(a => a.uniqueId == value.id);

        if (addObject) {
            var isUserExistReview = this.projectLookupGroup.userLookups.where(a => a.email == addObject.email)
            let userObjectAssigneeOrReviewer: any = {};

            userObjectAssigneeOrReviewer['projectModuleAssigneesOrReviewerId'] = 0
            userObjectAssigneeOrReviewer['projectId'] = this.projectId;

            if (isUserExistReview.length > 0)
                userObjectAssigneeOrReviewer['userId'] = isUserExistReview[0].userId
            else
                userObjectAssigneeOrReviewer['userId'] = 0

            userObjectAssigneeOrReviewer['isChecked'] = true
            userObjectAssigneeOrReviewer['userName'] = isUserExistReview[0].userName;
            userObjectAssigneeOrReviewer['email'] = isUserExistReview[0].email;
            userObjectAssigneeOrReviewer['uniqueId'] = value.id;
            userObjectAssigneeOrReviewer['isAssignee'] = assigneeOrReviewer == "assignee" ? true : false;
            userObjectAssigneeOrReviewer['isReviewer'] = assigneeOrReviewer == "reviewer" ? true : false;

            if (isExist.length == 0) {
                assigneeOrReviewer == 'assignee' ? this.collabaratorUsers.push(userObjectAssigneeOrReviewer) :
                    this.reviewerUsers.push(userObjectAssigneeOrReviewer);
            }
            else {
                isExist[0]['isChecked'] = false;
            }
        }
    }

    itemRemovedCollabratorOrReviewer(value, assigneeOrReviewer: string) {
        let removedObject = assigneeOrReviewer == 'assignee' ? this.collabaratorUsers.firstOrDefault(a => a.uniqueId == value.id) :
            this.reviewerUsers.firstOrDefault(a => a.uniqueId == value.id);

        if (removedObject) {
            removedObject['isChecked'] = false;
        }
    }

    saveAssigneesOrReviewers(): void {
        this.spinner.show();
        let projectId: number = this.projectFormGroup.controls.projectId.value;

        let projectId_ProjectModuleAssigneesOrReviewer = {
            "projectId": projectId,
            "ProjectModuleAssigneesOrReviewers": []
        };

        for (let index = 1; index <= 2; index++) {
            let arrayOfCollabaratorOrReviewer = (index == 1 ? this.collabaratorUsers.where(c => c.isChecked) : this.reviewerUsers.where(c => c.isChecked));

            for (let i = 0; i < arrayOfCollabaratorOrReviewer.length; i++) {
                let projectModuleAssigneesOrReviewer: ProjectModuleAssigneesOrReviewer = new ProjectModuleAssigneesOrReviewer();

                projectModuleAssigneesOrReviewer.isAssignee = index == 1 ? true : false;
                projectModuleAssigneesOrReviewer.isReviewer = index == 2 ? true : false;
                projectModuleAssigneesOrReviewer.userId = arrayOfCollabaratorOrReviewer[i].userId;
                projectModuleAssigneesOrReviewer.projectId = projectId;
                projectModuleAssigneesOrReviewer.projectModuleAssigneesOrReviewerId = arrayOfCollabaratorOrReviewer[i].projectModuleAssigneesOrReviewerId;

                projectId_ProjectModuleAssigneesOrReviewer.ProjectModuleAssigneesOrReviewers.push(projectModuleAssigneesOrReviewer);
            }
        }

        this.projectsService.collabaratorsOrReviewersInAllModules(projectId_ProjectModuleAssigneesOrReviewer).subscribe(res => {
            this.spinner.hide();
            location.reload();
        });
    }
}