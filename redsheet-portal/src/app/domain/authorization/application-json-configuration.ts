import { Injectable, Inject, ReflectiveInjector } from "@angular/core"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"


import { ApplicationConfiguration, ApplicationPage, ApplicationBroadcaster } from "@rx/core";


import { ApplicationService } from './app.service';
import { RxStorage } from "@rx/storage";

@Injectable()
export class ApplicationJsonConfiguration {
    storage: RxStorage;
    constructor(private applicationService: ApplicationService, private applicationBroadcaster: ApplicationBroadcaster) { 
        let injector: any = ReflectiveInjector.resolveAndCreate([RxStorage]);
        this.storage = injector.get(RxStorage);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        var applicationModuleId = ApplicationPage.get("applicationModuleId");
        var auth = this.storage.local.get('auth');
        if(applicationModuleId == 33 && auth)
            return true;

        if (!ApplicationConfiguration.isDataExits()) {
            let promise = new Promise<boolean>((resolve, reject) => {
                this.applicationService.getCachedKeys().subscribe(cachedKeys => {
                    ApplicationConfiguration.setCachedKeys(cachedKeys);
                    this.applicationService.getConfiguration('defaultlanguage').subscribe(t => {
                        ApplicationConfiguration.set(t);
                        this.applicationService.getLanguages().subscribe(languages => {
                            ApplicationConfiguration.setLanguages(languages);
                            ApplicationPage.addOrUpdateObject('accessItem', route.data.accessItem);
                            ApplicationPage.addOrUpdateObject('defaultLanguage', t.defaultLanguage);
                            this.applicationBroadcaster.configurationBroadCast(true);
                            this.getModuleContent(route.data, resolve);
                        })
                    })
                })
            });
            return promise;
        } else {
            let promise = new Promise<boolean>((resolve, reject) => {
                //Changes By Ishani Put OnInit
                ApplicationPage.addOrUpdateObject('accessItem', route.data.accessItem);
                //Changes By Ishani Put OnInit
                this.getModuleContent(route.data, resolve);
            });
            return promise;
        }
    }

    getModuleContent(data: any, resolve: any): void {
        var defaultLanguage = ApplicationConfiguration.getDefaultLanguage(); // Ishani Make one function for gettingDefault Language
        
        var action = ApplicationPage.get("accessItem");
        var applicationModuleId = ApplicationPage.get("applicationModuleId");
        this.applicationService.getModuleContents(defaultLanguage, action, applicationModuleId).subscribe(t => {
            if (data.isPopup == undefined)
                ApplicationPage.removeLast();
            ApplicationPage.addOrUpdateModuleContent(applicationModuleId, t);
            resolve(true);
        })
    }

}