import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModuleReviewer, ProjectModuleAssignee, OurTeamMember, UserMessage, RecentActivityAndNotification,  vUserRecord  } from './'
export class User {
    constructor(user?: User  | vUserRecord )  {
        let properties = [ "address", "applicationTimeZoneId", "city", "companyId", "companyName", "email", "facebookUrl", "firstName", "initial", "isFirstTimeLogin", "languageId", "lastName", "linkdinUrl", "mobile", "office", "password", "requestorId", "roleId", "salt", "securityAnswer", "securityQuestionId", "stateId", "title", "twitterUrl", "userId", "userName", "verificationCode", "zipCode", "statusId", "projectModuleReviewers", "projectModuleAssignees", "ourTeamMembers", "userMessages", "userMessages1", "recentActivityAndNotifications", "userPassword", "isChangePassword", "confirmPassword", "dateData",];
        for (let property of properties)
            if (user && user[property])
                this[property] = user[property];
    }
 
    @maxLength(100)
	address : string =   undefined;
 
	applicationTimeZoneId : number =   undefined;
 
    @maxLength(50)
	city : string =   undefined;
 
    @required()
	companyId : string =   undefined;
 
    @maxLength(100)
	companyName : string =   undefined;
 
    @required()
    @maxLength(150)
	email : string =   undefined;
 
    @maxLength(100)
	facebookUrl : string =   undefined;
 
    @required()
    @maxLength(100)
	firstName : string =   undefined;
 
    @required()
    @maxLength(6)
	initial : string =   undefined;
 
	isFirstTimeLogin : boolean = false ;
 
	languageId : number =   undefined;
 
    @required()
    @maxLength(100)
	lastName : string =   undefined;
 
    @maxLength(100)
	linkdinUrl : string =   undefined;
 
    @maxLength(20)
	mobile : string =   undefined;
 
    @maxLength(20)
	office : string =   undefined;
 
    @maxLength(132)
	password : any =   undefined;
 
    @required()
	requestorId : string =   undefined;
 
    @range(1,2147483647)
	roleId : number =   undefined;
 
    @maxLength(140)
	salt : any =   undefined;
 
    @maxLength(50)
	securityAnswer : string =   undefined;
 
	securityQuestionId : number =   undefined;
 
	stateId : number =   undefined;
 
    @maxLength(50)
	title : string =   undefined;
 
    @maxLength(100)
	twitterUrl : string =   undefined;
 
	userId : number =   0 ;
 
    @maxLength(50)
	userName : string =   undefined;
 
	verificationCode : string =   undefined;
 
    @maxLength(10)
	zipCode : string =   undefined;
 
	statusId : number =   undefined;
	@nested(ProjectModuleReviewer)
	projectModuleReviewers: ProjectModuleReviewer[];

	@nested(ProjectModuleAssignee)
	projectModuleAssignees: ProjectModuleAssignee[];

	@nested(OurTeamMember)
	ourTeamMembers: OurTeamMember[];

	@nested(UserMessage)
	userMessages: UserMessage[];

	@nested(UserMessage)
	userMessages1: UserMessage[];

	@nested(RecentActivityAndNotification)
	recentActivityAndNotifications: RecentActivityAndNotification[];


	userPassword : string =   undefined;
	isChangePassword : boolean = false ;
	confirmPassword : string =   undefined;
	dateData : Date =   undefined;

}
