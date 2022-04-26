import { required, maxLength, range } from '@rx/annotations';

export class vMeetingRequirement {
    constructor(vMeetingRequirement?: vMeetingRequirement )  {
        let properties = [ "cultureCountryId", "meetingRequirementId", "meetingRequirementValue",];
        for (let property of properties)
            if (vMeetingRequirement && vMeetingRequirement[property])
                this[property] = vMeetingRequirement[property];
    }
 
	cultureCountryId : number =   0 ;
 
    @range(1,2147483647)
	meetingRequirementId : number =   undefined;
 
    @required()
    @maxLength(500)
	meetingRequirementValue : string =   undefined;
}
