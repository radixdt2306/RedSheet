import { required, maxLength, range, nested } from '@rx/annotations';
import { Project,  } from './'
export class ExportReportPDF {
    constructor(exportReportPDF?: ExportReportPDF )  {
        let properties = [ "exportReportId", "projectId",];
        for (let property of properties)
            if (exportReportPDF && exportReportPDF[property])
                this[property] = exportReportPDF[property];
    }
 
	exportReportId : number =   0 ;
 
    @range(0,2147483647)
	projectId : number =   undefined;
	project : Project  ;


}
