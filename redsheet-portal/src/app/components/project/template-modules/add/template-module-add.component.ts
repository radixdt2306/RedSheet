import { Component, Input, OnInit, ComponentFactoryResolver } from "@angular/core"
import { ProjectsService } from "../../projects/projects.service"
import { ProjectNegotionalityLookups, ProjectModuleLookups } from "app/lookups";
import { RxPopup } from "@rx/view";
import { CommonLookups } from "app/lookups/CommonLookups";
import { ApplicationService } from "app/domain/authorization";
import { ApplicationServicesService } from "app/components/project/projects/application-services.service";
import { TabModel } from "@rx/view/views";
import { TagModel } from "@rx/forms";


@Component({
    templateUrl: './template-module-add.component.html',
})
export class TemplateModuleAddComponent {
    showComponent : boolean = false;
    currentTemplateModule: any;
    @Input() templateModule: any;
    @Input() projectNote: any;
    @Input() isAllowCustomization : boolean;
    collabratorUsers: any[] =[];
    reviewerUsers: any[] =[];
    users:any[];
    selectCollabrators:string = "";
    selectReviewers:string = "";
    addObjectReviewer:any[]=[];
    addObjectCollaborator:any[]=[];
    constructor(private applicationService: ApplicationServicesService, private popup: RxPopup, private componentFactoryResolver: ComponentFactoryResolver) {
      
    }

    ngOnInit() {
        this.applicationService.getApplicationUsers().subscribe(t=>{
            this.users = t;
            if (this.templateModule) {
                this.currentTemplateModule = {};
                for (var column in this.templateModule)
                {
                    this.currentTemplateModule[column] = this.templateModule[column];
                    this.currentTemplateModule["iconClass"] =this. getIconClass(this.templateModule["controllerName"]);
                }
                
                for(let i =0;i<this.users.length;i++)    
                {
                    let collabratorUser = this.templateModule.assignedUsers.where(a=>a.surname == this.users[i]['surname'] && a.forename == this.users[i]['forename'])
                    if(collabratorUser != undefined && collabratorUser.length > 0)
                    {
                        collabratorUser[0]['isChecked'] = true;
                        this.selectCollabrators += this.users[i]['uniqueId'] + ','
                    }
                    else
                        this.collabratorUsers.push(this.users[i])
                    let reviewerUsers = this.templateModule.reviewers.where(a=>a.surname == this.users[i]['surname'] && a.forename == this.users[i]['forename'])
                    if(reviewerUsers != undefined && reviewerUsers.length > 0)
                    {
                        reviewerUsers[0]['isChecked'] = true;
                        this.selectReviewers += this.users[i]['uniqueId'] + ','
                    }
                    else
                        this.reviewerUsers.push(this.users[i])
                }
                this.showComponent = true;
            }
        })
    }

    
    getIconClass(controllerName):string {              
        ;
                let iconClass: string;
                switch(controllerName.toLowerCase()) {
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
                        iconClass= "redsheet redsheet-game";
                        break;
                    case "ctrl_negotiables":
                        iconClass = "redsheet redsheet-requirement";
                        break;
                    case "ctrl_concessionstrategy":
                        iconClass= "redsheet redsheet-requirement";
                        break;
                    case "ctrl_theirnegotiables":
                        iconClass = "redsheet redsheet-their-requirement";
                        break;
                    case "ctrl_cultureplan":
                        iconClass = "redsheet redsheet-culture-plan";
                        break;
                    case "ctrl_preparation":
                        iconClass= "redsheet redsheet-preparation";
                        break;
                    case "ctrl_negotiationeventtimeline":
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

    saveModule() {        
        ;
        for (var column in this.currentTemplateModule) {
            this.templateModule[column] = this.currentTemplateModule[column];
        }
        this.templateModule.assignedUsers = this.templateModule.assignedUsers.where(a=>a.isChecked);
        this.templateModule.reviewers = this.templateModule.reviewers.where(a=>a.isChecked);
        this.hidePopup();
    }
    cancel() {
        this.addObjectCollaborator.forEach(x => {
            this.itemRemovedCollabrators(x);
        });
        this.addObjectReviewer.forEach(z => {
            this.itemRemovedReviewers(z);
        });
        this.hidePopup();
    }
    hidePopup() {
        document.body.className = "";
        this.popup.hide(TemplateModuleAddComponent);
    }

    itemAddedCollabrators(value:TagModel){
        let addObject = this.collabratorUsers.firstOrDefault(a=>a.uniqueId == value.id);
        this.addObjectCollaborator.push(value);
        if(addObject){
            addObject['isChecked'] = true;
            this.templateModule.assignedUsers.push(Object.assign({},addObject))
        }
    }
    itemAddedReviewers(value:TagModel){
        let addObject = this.reviewerUsers.firstOrDefault(a=>a.uniqueId == value.id);
        this.addObjectReviewer.push(value);
        if(addObject){
            addObject['isChecked'] = true;
            this.templateModule.reviewers.push(Object.assign({},addObject))
        }
    }
    itemRemovedCollabrators(value){
        let removedObject = this.collabratorUsers.firstOrDefault(a=>a.uniqueId == value.id);
        let indexOfObject = this.templateModule.assignedUsers.findIndex(a=>a.uniqueId == value.id);
        if(removedObject){
            removedObject['isChecked'] = false;
            this.templateModule.assignedUsers.splice(indexOfObject,1)
        }
    }
    itemRemovedReviewers(value){
        let removedObject = this.reviewerUsers.firstOrDefault(a=>a.uniqueId == value.id);
        let indexOfObject = this.templateModule.reviewers.findIndex(a=>a.uniqueId == value.id);
        if(removedObject){
            removedObject['isChecked'] = false;
            this.templateModule.reviewers.splice(indexOfObject,1)
        }
    }
    getSymbol(templateModuleId): string {
        let iconClass: string;
        if (templateModuleId == 34 || templateModuleId == 40 || templateModuleId == 38|| templateModuleId == 50 || templateModuleId == 49) {
            return iconClass = "sup color-primary fa fa-registered";
        }
        else {
            return iconClass = "";
        }
    }
}