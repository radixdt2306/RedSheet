import { ReflectiveInjector, Inject } from "@angular/core";
import { RequestOptions, Headers } from "@angular/http";
import { user } from "@rx/security";
import { RequestHeaders } from "@rx/http";
import { RxStorage } from "@rx/storage"
import { RxSpinner } from "@rx/view";
import { AuthorizeApi } from "@rx/security";
import { requestCollection, Uri } from './request-uri';
import { ApplicationPage } from "@rx/core";
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModuleStatic } from "app/domain/project-module.static";

export class ApplicationRequestHeaders implements RequestHeaders {
    storage: RxStorage;
    headers: Headers;
    constructor( @Inject(RxSpinner) private spinner: RxSpinner) {
        let injector: any = ReflectiveInjector.resolveAndCreate([RxStorage]);
        this.storage = injector.get(RxStorage);
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json, */*; q=0.01');
       
    }
    get(url: string, requestMethod: string, authorizeApi?: AuthorizeApi): RequestOptions | boolean {
        if (requestCollection.length == 0)
            this.spinner.show();
            requestCollection.push(0);
        var auth = this.storage.local.get('auth');
        this.headers.delete("Authorization");
        this.headers.delete("x-application-module");
        this.headers.delete("x-child-module-name");
        this.headers.delete("x-record");
        this.headers.delete("x-project-module-id");
        if (auth != null && auth != undefined)
            this.headers.append("Authorization", auth);
        if (authorizeApi && authorizeApi.api) {
            if (authorizeApi.applicationModuleId)
                this.headers.append("x-application-module", authorizeApi.applicationModuleId.toString());
            if (authorizeApi.childModuleName) {
                this.headers.append("x-application-module", ApplicationPage.get("applicationModuleId"));
                this.headers.append("x-child-module-name", authorizeApi.childModuleName);
            }
            if (authorizeApi.mainRecordId)
                this.headers.append("x-record", authorizeApi.mainRecordId.toString())
            this.headers.append("x-project-module-id",String(ProjectModuleStatic.CurrentProjectModuleId))
        }
        let opts: RequestOptions = new RequestOptions({ headers: this.headers });
        return opts;
    }
}
