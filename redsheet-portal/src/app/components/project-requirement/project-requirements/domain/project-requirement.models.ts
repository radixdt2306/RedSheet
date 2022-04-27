import { 
	ProjectRequirement, OurRequirementDetail, TheirRequirementDetail, vOurRequirementDetail, vTheirRequirementDetail,
} from 'app/database-models';

export class ProjectRequirementLookupGroup {
	projectRequirement : ProjectRequirement;
}


export class ProjectRequirementModel{
	constructor(	
		public projectZomaId:number,
		public isZoma:boolean,
		public ourRequirementDetail?:vOurRequirementDetail,
		public theirRequirementDetail?:vTheirRequirementDetail){

		}
	
}