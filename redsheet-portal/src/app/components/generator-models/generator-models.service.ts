import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { GeneratorModels } from "app/generator-models";



@Injectable()
export class GeneratorModelsService {
    private api: string = 'api/GeneratorModels'
    constructor(
        private http: RxHttp
    ) { }
    get(): Observable<GeneratorModels[]> {
        return this.http.get<GeneratorModels[]>(this.api);
    }
    put(generateModel: GeneratorModels): Observable<GeneratorModels> {
        return this.http.put<GeneratorModels>(this.api, generateModel);
    }
}
