import { required, maxLength, range, nested } from '@rx/annotations';

export class CultureReportInformation {
    constructor(cultureReportInformation?: CultureReportInformation )  {
        let properties = [ "cultureInformationDetail", "cultureInformationId", "ourCulture", "theirCulture", "cultureSummaryId",];
        for (let property of properties)
            if (cultureReportInformation && cultureReportInformation[property])
                this[property] = cultureReportInformation[property];
    }
 
	cultureInformationDetail : string =   undefined;
 
	cultureInformationId : number =   0 ;
 
	ourCulture : boolean = false ;
 
	theirCulture : boolean = false ;
 
    @range(0,2147483647)
	cultureSummaryId : number =   undefined;


}
