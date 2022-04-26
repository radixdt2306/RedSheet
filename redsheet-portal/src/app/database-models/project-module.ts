import { required, maxLength, range, nested } from '@rx/annotations';
import { Project, ProjectNegotiation, ProjectCulture, ProjectOutcomeAndLearning, NanoDiscussionSequence, NanoTheirBatna, NanoOurBatna, ProjectPower, ProjectGameDetail, RecentActivityAndNotification, ProjectNegotionality, ProjectModuleReview, ProjectPreparation, LiteMeetingManagement, ProjectZoma, ProjectRequirement, LiteProjectBackground, ProjectPostEventAction, ProjectModuleReviewer, ProjectModuleAssignee, NanoProjectNegotiable, ProjectBackground, ProjectCarryForward, NanoScopeToNegotiateObjective, ProjectEventTimeline, ProjectStakeholder,  vProjectModuleRecord  } from './'
export class ProjectModule {
    constructor(projectModule?: ProjectModule  | vProjectModuleRecord )  {
        let properties = [ "baseId", "createdBy", "createdOn", "dependantModuleId", "hTMLHelp", "isClosed", "isVisited", "moduleOrder", "note", "ownerNote", "projectModuleId", "status", "templateModuleId", "templateModuleName", "updatedBy", "updatedOn", "projectId", "projectNegotiations", "projectCultures", "projectOutcomeAndLearnings", "nanoDiscussionSequences", "nanoTheirBatnas", "nanoOurBatnas", "projectPowers", "projectGameDetails", "recentActivityAndNotifications", "projectNegotionalities", "projectModuleReviews", "projectPreparations", "liteMeetingManagements", "projectZomas", "projectRequirements", "liteProjectBackgrounds", "projectPostEventActions", "projectModuleReviewers", "projectModuleAssignees", "nanoProjectNegotiables", "projectBackgrounds", "projectCarryForwards", "nanoScopeToNegotiateObjectives", "projectEventTimelines", "projectStakeholders",];
        for (let property of properties)
            if (projectModule && projectModule[property])
                this[property] = projectModule[property];
    }
 
    @range(0,2147483647)
	baseId : number =   undefined;
 
    @range(1,2147483647)
	createdBy : number =   undefined;
 
    @required()
	createdOn : Date =   undefined;
 
    @range(0,2147483647)
	dependantModuleId : number =   undefined;
 
    @required()
	hTMLHelp : string =   undefined;
 
	isClosed : boolean = false ;
 
	isVisited : boolean = false ;
 
    @range(1,2147483647)
	moduleOrder : number =   undefined;
 
	note : string =   undefined;
 
	ownerNote : string =   undefined;
 
	projectModuleId : number =   0 ;
 
	status : boolean = false ;
 
    @range(1,2147483647)
	templateModuleId : number =   undefined;
 
    @required()
    @maxLength(200)
	templateModuleName : string =   undefined;
 
	updatedBy : number =   undefined;
 
	updatedOn : Date =   undefined;
 
    @range(0,2147483647)
	projectId : number =   undefined;
	project : Project  ;
	@nested(ProjectNegotiation)
	projectNegotiations: ProjectNegotiation[];

	@nested(ProjectCulture)
	projectCultures: ProjectCulture[];

	@nested(ProjectOutcomeAndLearning)
	projectOutcomeAndLearnings: ProjectOutcomeAndLearning[];

	@nested(NanoDiscussionSequence)
	nanoDiscussionSequences: NanoDiscussionSequence[];

	@nested(NanoTheirBatna)
	nanoTheirBatnas: NanoTheirBatna[];

	@nested(NanoOurBatna)
	nanoOurBatnas: NanoOurBatna[];

	@nested(ProjectPower)
	projectPowers: ProjectPower[];

	@nested(ProjectGameDetail)
	projectGameDetails: ProjectGameDetail[];

	@nested(RecentActivityAndNotification)
	recentActivityAndNotifications: RecentActivityAndNotification[];

	@nested(ProjectNegotionality)
	projectNegotionalities: ProjectNegotionality[];

	@nested(ProjectModuleReview)
	projectModuleReviews: ProjectModuleReview[];

	@nested(ProjectPreparation)
	projectPreparations: ProjectPreparation[];

	@nested(LiteMeetingManagement)
	liteMeetingManagements: LiteMeetingManagement[];

	@nested(ProjectZoma)
	projectZomas: ProjectZoma[];

	@nested(ProjectRequirement)
	projectRequirements: ProjectRequirement[];

	@nested(LiteProjectBackground)
	liteProjectBackgrounds: LiteProjectBackground[];

	@nested(ProjectPostEventAction)
	projectPostEventActions: ProjectPostEventAction[];

	@nested(ProjectModuleReviewer)
	projectModuleReviewers: ProjectModuleReviewer[];

	@nested(ProjectModuleAssignee)
	projectModuleAssignees: ProjectModuleAssignee[];

	@nested(NanoProjectNegotiable)
	nanoProjectNegotiables: NanoProjectNegotiable[];

	@nested(ProjectBackground)
	projectBackgrounds: ProjectBackground[];

	@nested(ProjectCarryForward)
	projectCarryForwards: ProjectCarryForward[];

	@nested(NanoScopeToNegotiateObjective)
	nanoScopeToNegotiateObjectives: NanoScopeToNegotiateObjective[];

	@nested(ProjectEventTimeline)
	projectEventTimelines: ProjectEventTimeline[];

	@nested(ProjectStakeholder)
	projectStakeholders: ProjectStakeholder[];



}
