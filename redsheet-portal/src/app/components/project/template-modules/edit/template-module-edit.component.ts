import { Component, Input, OnInit, ComponentFactoryResolver } from "@angular/core"
import { ProjectsService } from "../../projects/projects.service"
import { ProjectNegotionalityLookups, ProjectModuleLookups } from "app/lookups";
import { RxPopup } from "@rx/view";
import { ApplicationServicesService } from "app/components/project/projects/application-services.service";
import { TagModel } from "@rx/forms";
import { vUserLookup, ProjectModule, ProjectModuleAssignee, ProjectModuleReviewer } from "app/database-models";
import { TemplateModuleService } from "app/components/project/template-modules/template-module.service";


@Component({
    templateUrl: './template-module-edit.component.html',
})
export class TemplateModuleEditComponent {
    showComponent: boolean = false;
    //private currentTemplateModule: any;
    @Input() templateModule: any;
    @Input() projectNote: any;
    @Input() isAllowCustomization: boolean;
    @Input() userLookups: vUserLookup[];
    users: any[];
    collabratorUsers: any[] = [];
    reviewerUsers: any[] = [];
    selectCollabrators: string = "";
    selectReviewers: string = "";
    validationFailed: {
        [key: string]: any;
    };
    constructor(private projectsService: ProjectsService,
        private applicationService: ApplicationServicesService,
        private popup: RxPopup, private componentFactoryResolver: ComponentFactoryResolver,
        private templateModuleService: TemplateModuleService
    ) {
        this.validationFailed = {};
    }

    ngOnInit() {
        this.applicationService.getApplicationUsers().subscribe(t => {
            this.users = t;
            if (this.templateModule) {
                // this.currentTemplateModule = {};
                // for (var column in this.templateModule)
                //     this.currentTemplateModule[column] = this.templateModule[column];

                this.templateModule.assignedUsers = [], this.templateModule.reviewers = [];
                for (let i = 0; i < this.templateModule.projectModuleAssignees.length; i++) {
                    var currentProjectModuleAssignee = this.templateModule.projectModuleAssignees[i];
                    var isUserExist = this.userLookups.where(a => a.userId == currentProjectModuleAssignee.userId)
                    if (isUserExist != undefined && isUserExist.length > 0) {
                        let userObject: any = {};
                        userObject['projectModuleAssigneeId'] = currentProjectModuleAssignee.projectModuleAssigneeId
                        userObject['projectModuleId'] = currentProjectModuleAssignee.projectModuleId
                        userObject['userId'] = currentProjectModuleAssignee.userId
                        userObject['isChecked'] = true
                        userObject['userName'] = isUserExist[0].userName;
                        userObject['email'] = isUserExist[0].email;
                        this.templateModule.assignedUsers.push(userObject);
                    }
                }
                for (let k = 0; k < this.templateModule.projectModuleReviewers.length; k++) {
                    var currentProjectModuleReview = this.templateModule.projectModuleReviewers[k];
                    var isUserExistReview = this.userLookups.where(a => a.userId == currentProjectModuleReview.userId)
                    if (isUserExistReview != undefined && isUserExistReview.length > 0) {
                        let userObjectReviewer: any = {};
                        userObjectReviewer['projectModuleReviewerId'] = currentProjectModuleReview.projectModuleReviewerId;
                        userObjectReviewer['projectModuleId'] = currentProjectModuleReview.projectModuleId
                        userObjectReviewer['userId'] = currentProjectModuleReview.userId
                        userObjectReviewer['isChecked'] = true
                        userObjectReviewer['userName'] = isUserExistReview[0].userName;
                        userObjectReviewer['email'] = isUserExistReview[0].email;
                        this.templateModule.reviewers.push(userObjectReviewer);
                    }
                }
                for (let l = 0; l < this.users.length; l++) {
                    let currentObject = this.users[l];
                    var isExistCollabrators = this.templateModule.assignedUsers.where(a => a.email == currentObject.email);
                    if (isExistCollabrators.length == 0)
                        this.collabratorUsers.push(this.users[l])
                    var isExistReviewers = this.templateModule.reviewers.where(a => a.email == currentObject.email);
                    if (isExistReviewers.length == 0)
                        this.reviewerUsers.push(this.users[l])
                }
                this.showComponent = true;
            }

        });
    }

    saveModule() {
        // let projectModuleAssignees = this.templateModule.projectModuleAssignees.where(a=>a.isChecked == true);
        // let projectModuleReviewers = this.templateModule.reviewers.where(a=>a.isChecked == true);
        let projectModuleAssignees = this.templateModule.assignedUsers;
        let projectModuleReviewers = this.templateModule.reviewers;
        let projectModule: ProjectModule = new ProjectModule();
        projectModule = this.templateModule;
        projectModule.hTMLHelp = this.templateModule.hTMLHelp == undefined ? "HTML Help" : this.templateModule.hTMLHelp;
        projectModule.projectModuleAssignees = [];
        projectModule.projectModuleReviewers = [];
        for (let i = 0; i < projectModuleAssignees.length; i++) {
            let currentObject = projectModuleAssignees[i];
            let projectModuleAssignee: ProjectModuleAssignee = new ProjectModuleAssignee();
            projectModuleAssignee.projectModuleId = currentObject['projectModuleId']
            projectModuleAssignee.userId = currentObject['userId']
            projectModuleAssignee.projectModuleAssigneeId = currentObject['projectModuleAssigneeId']
            projectModuleAssignee['isChecked'] = currentObject['isChecked']
            projectModule.projectModuleAssignees.push(projectModuleAssignee);
        }
        for (let i = 0; i < projectModuleReviewers.length; i++) {
            let currentObject = projectModuleReviewers[i];
            let projectModuleReviewer: ProjectModuleReviewer = new ProjectModuleReviewer();
            projectModuleReviewer.projectModuleId = currentObject['projectModuleId']
            projectModuleReviewer.userId = currentObject['userId']
            projectModuleReviewer.projectModuleReviewerId = currentObject['projectModuleReviewerId']
            projectModuleReviewer['isChecked'] = currentObject['isChecked']
            projectModule.projectModuleReviewers.push(projectModuleReviewer);
        }
        //
        // console.log(JSON.stringify(projectModule))
        this.templateModuleService.put(projectModule).subscribe(t => {
            this.hidePopup();
        }, error => {
            if (!error.status) {
                this.validationFailed = error;
            }
        });
        // for (var column in this.currentTemplateModule) {
        //     this.templateModule[column] = this.currentTemplateModule[column];
        // }

    }

    hidePopup() {
        document.body.className = "";
        this.popup.hide(TemplateModuleEditComponent);
    }

    itemAddedCollabrators(value: TagModel) {
        let addObject = this.collabratorUsers.firstOrDefault(a => a.uniqueId == value.id);
        let isExist = this.templateModule.assignedUsers.where(a => a.uniqueId == value.id);
        if (addObject) {
            var isUserExistReview = this.userLookups.where(a => a.email == addObject.email)
            let userObjectAssignee: any = {};
            userObjectAssignee['projectModuleAssigneeId'] = 0
            userObjectAssignee['projectModuleId'] = this.templateModule.projectModuleId;
            if (isUserExistReview.length > 0)
                userObjectAssignee['userId'] = isUserExistReview[0].userId
            else
                userObjectAssignee['userId'] = 0
            userObjectAssignee['isChecked'] = true
            userObjectAssignee['userName'] = isUserExistReview[0].userName;
            userObjectAssignee['email'] = isUserExistReview[0].email;
            userObjectAssignee['uniqueId'] = value.id;
            if (isExist.length == 0) {
                this.templateModule.assignedUsers.push(userObjectAssignee)
            }
            else {
                isExist[0]['isChecked'] = false;
            }

        }
    }
    itemAddedReviewers(value: TagModel) {
        let addObject = this.reviewerUsers.firstOrDefault(a => a.uniqueId == value.id);
        let isExist = this.templateModule.reviewers.where(a => a.uniqueId == value.id);
        if (addObject) {
            var isUserExistReview = this.userLookups.where(a => a.email == addObject.email)
            let userObjectReviewer: any = {};
            userObjectReviewer['projectModuleReviewerId'] = 0
            userObjectReviewer['projectModuleId'] = this.templateModule.projectModuleId;
            if (isUserExistReview.length > 0)
                userObjectReviewer['userId'] = isUserExistReview[0].userId
            else
                userObjectReviewer['userId'] = 0
            userObjectReviewer['isChecked'] = true
            userObjectReviewer['userName'] = isUserExistReview[0].userName;
            userObjectReviewer['email'] = isUserExistReview[0].email;
            userObjectReviewer['uniqueId'] = value.id;
            if (isExist.length == 0) {
                this.templateModule.reviewers.push(userObjectReviewer)
            }
            else {
                isExist[0]['isChecked'] = false;
            }
        }
    }
    itemRemovedCollabrators(value) {
        let removedObject = this.templateModule.assignedUsers.firstOrDefault(a => a.uniqueId == value.id);
        if (removedObject) {
            removedObject['isChecked'] = false;
        }
    }
    itemRemovedReviewers(value) {
        let removedObject = this.templateModule.reviewers.firstOrDefault(a => a.uniqueId == value.id);
        if (removedObject) {
            removedObject['isChecked'] = false;
        }
    }
    getSymbol(templateModuleId): string {
        let iconClass: string;
        if (templateModuleId == 41 || templateModuleId == 45 || templateModuleId == 46) {
            return iconClass = "sup color-primary fa fa-registered";
        }
        else {
            return iconClass = "";
        }
    }
}