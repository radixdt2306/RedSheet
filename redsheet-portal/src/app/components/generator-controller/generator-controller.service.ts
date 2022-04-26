import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { ModuleMaster } from "app/database-models";
import { GeneratorControllerLookupGroup } from "app/components/generator-controller/models/generator-controller.model";
import { GeneratorController, GeneratorContextLookup, GeneratorContextView } from "app/generator-models";


@Injectable()
export class GeneratorControllerService {
    constructor(
        private http: RxHttp
    ) { }
    private api: string = 'api/Contexts'
    private apiLookup: string = 'api/ContextLookups'
    private apiViews: string = 'api/ContextViews'
    get(): Observable<GeneratorControllerLookupGroup> {
        return this.http.get<GeneratorControllerLookupGroup>(this.api);
    }
    put(generatorController: GeneratorController): Observable<GeneratorController> {
        return this.http.put<GeneratorController>(this.api, generatorController);
    }
    postLookup(generatorLookup: GeneratorContextLookup): Observable<GeneratorContextLookup> {
        return this.http.post<GeneratorContextLookup>(this.apiLookup, generatorLookup);
    }

    deleteLookup(id:any): Observable<GeneratorContextLookup> {
        return this.http.delete<GeneratorContextLookup>(this.apiLookup, id);
    }
     postView(generatorLookup: GeneratorContextView): Observable<GeneratorContextView> {
        return this.http.post<GeneratorContextView>(this.apiViews, generatorLookup);
    }
     deleteView(id: any): Observable<GeneratorContextView> {
         return this.http.delete(this.apiViews, id);
     }

    
}
