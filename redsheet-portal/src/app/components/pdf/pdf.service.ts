import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

import { RxHttp, RequestQueryParams, LookupAction } from '@rx/http';
import { AuthorizeApi } from "@rx/security";


@Injectable()
export class PdfService {

  private get api(): AuthorizeApi {
    var authorizeApi: AuthorizeApi = {
      api: `api/Projects`,
      childModuleName: undefined,
      applicationModuleId: 1046,
      keyName: 'projectId'

    }
    return authorizeApi;
  }

  constructor(
    private http: RxHttp
  ) { }


  htmlToPdfData(projectId: number): Observable<string> {
    let apiForPdfGeneration = this.api;
    apiForPdfGeneration.api = `api/ExportReportPDFs/htmlToPdfData?projectId=${projectId}`;
    return this.http.get<any>(apiForPdfGeneration);
  }
}
