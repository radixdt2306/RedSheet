import { Component, OnInit } from '@angular/core';

import { ApplicationConfiguration, ApplicationPage, ApplicationBroadcaster } from "@rx/core";
import { RxStorage } from "@rx/storage";
import { UserAuthorizationService } from "app/domain/authorization";
import { Router, ActivatedRouteSnapshot,  NavigationEnd } from '@angular/router';
import { ProjectModulesService } from 'app/components/project-module/project-modules/project-modules.service';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { IS_MODULE_LOCK,PROJECT_MODULE_ADDED, SHOW_SIDE_BAR_BUTTON, HIDE_SIDE_BAR_BUTTON,BACKGOUND_CONST,STAKEHOLDER_CONST,CULTURE_CONST,NEGOTIONALITY_CONST,THISNEGOTIAION_CONST,POWER_CONST,GAME_CONST,NEGOTIABLES_CONST,THEIRNEGOTIABLES_CONST,CULTUREPLAN_CONST,PREPARATION_CONST,EVENTTIMELINE_CONST,POSTEVENTACTION_CONST,LEARNING_CONST } from 'app/const';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {
    activeMenu: number = 0;
    isActive: boolean = false;
    loggedInName: string;
    templateName:string;
    templateModuleId:any;
    iconClass:string;
    projectModules:any;
    projectModuleId:number;
    isHideSidebar:boolean = true;
    templateModuleDetail:any;
    constructor(
        private storage: RxStorage, 
        private userAuthorizationService: UserAuthorizationService,
        private projectModuleService:ProjectModulesService, 
        private router: Router,
        private applicationBroadcaster:ApplicationBroadcaster
    ) { 
        
        this.applicationBroadcaster.allTypeSubscriber.subscribe(message=>{
            if(message.action == PROJECT_MODULE_ADDED.action){
                
                this.projectModules.forEach(t=>{
                    
                    // if(t.uri.indexOf(message.filterText) != -1){
                    //        t.uri =  message.value;
                    // }                    
                    //    if(t.templateModuleId ==  message.filterText)
                    //         {
                    //             t.uri =  message.value;
                    //         }    
                    let modules: any[] = <any>(this.projectModules);
                    for(let i = 0;i < modules.length; i++ )
                    {
                        if(modules[i].templateModuleId ==  message.filterText)
                        {
                            if(modules[i].templateModuleId == NEGOTIABLES_CONST.value)    
                            {
                                modules[i].uri = message.value;
                                if(modules[i+1]){
                                    var splitText = modules[i+1].uri.split('/');
                                    splitText[4] = message.dependantValue;
                                    var replaceString = '';
                                    splitText.forEach(t=>{
                                        replaceString += t+'/';
                                    })
                                    modules[i+1].uri = replaceString;
                                }                                
                            }
                            else
                            {
                                modules[i].uri = message.value;
                            }
                        }                
                    }                
                })
            }
            else if(message.action == IS_MODULE_LOCK.action)
            {                
                var pmId  = message.value;
                this.projectModuleService.search(true,{projectModuleId:pmId}).subscribe(t=>{ 
                    this.templateName = t["projectModules"][0]["templateName"];
                    this.projectModules = t["projectModules"];
            })
            }
        })
               
           let valueObject:any = {};
           if(this.router.routerState && this.router.routerState.root && this.router.routerState.root.firstChild && this.router.routerState.root.firstChild.params &&  this.router.routerState.root.firstChild.params["value"]){
            valueObject = this.router.routerState.root.firstChild.params["value"];
            this.projectModuleId = valueObject.projectModuleId ;//this.activatedRouteSnapshot.params["productModuleId"];
           }else{

           }
            
    }
    ngOnInit(): void {
        if (this.storage.session.get("selectedRootModule") == undefined) {
            this.activeMenu = 24
            this.storage.session.save("selectedRootModule", 24);
        }
        else {
            this.activeMenu = this.storage.session.get("selectedRootModule")
        }
       
        this.projectModuleService.search(true,{projectModuleId:this.projectModuleId}).subscribe(t=>{   
                this.templateName = t["projectModules"][0]["templateName"];
                
                this.projectModules = t["projectModules"];
        })
    }

    getSymbol(TemplateModuleId):string
    {
        let iconClass: string;
        if(TemplateModuleId == 41 || TemplateModuleId == 45 || TemplateModuleId == 46)
        {
            return iconClass ="sup fa fa-registered";
        }
        else
        {
            return iconClass = "";  
        }
        
    }

    
    changeActiveMenu(menuIndex: number): void {        
        this.activeMenu = menuIndex;
        this.storage.session.save("selectedRootModule", menuIndex);
    }

    hideSidebar(){
        this.isHideSidebar = !this.isHideSidebar;
        if(this.isHideSidebar)
            this.applicationBroadcaster.allTypeBroadCast(HIDE_SIDE_BAR_BUTTON)
        else
            this.applicationBroadcaster.allTypeBroadCast(SHOW_SIDE_BAR_BUTTON)
            
            
    }
}
