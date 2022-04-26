import { required, maxLength, range } from '@rx/annotations';

export class MeetingRequirement {
    constructor(meetingRequirement?: MeetingRequirement )  {
        let properties = [ "cultureCountryId", "meetingRequirementId", "meetingRequirementValue",];
        for (let property of properties)
            if (meetingRequirement && meetingRequirement[property])
                this[property] = meetingRequirement[property];
    }
 
    @range(1,2147483647)
	cultureCountryId : number =   undefined;
 
	meetingRequirementId : number =   0 ;
 
    @required()
    @maxLength(500)
	meetingRequirementValue : string =   undefined;
}
