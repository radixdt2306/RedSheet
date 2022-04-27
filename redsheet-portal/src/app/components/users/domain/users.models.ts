import { required, maxLength, range, } from '@rx/annotations';
import { Role, vLanguage, vApplicationTimeZone, SecurityQuestion, User } from "app/database-models";
export class UsersResultModel {
    constructor(usersResultModel?: UsersResultModel) {
        let properties = ["userId", "userName", "fullName","roleName","languageName","facebookUrl","linkdinUrl","twitterUrl","applicationTimeZoneName"];
        for (let property of properties)
            if (usersResultModel && usersResultModel[property])
                this[property] = usersResultModel[property];
    }
    userId: number = 0;
    @maxLength(50)
    userName: string = undefined;  
    fullName: string = undefined; 
    @maxLength(100)
    roleName: string = undefined;  
    @maxLength(100)
    languageName: string = undefined;  
    applicationTimeZoneName: string = undefined;  
    @maxLength(100)
    facebookUrl: string = undefined;  
    @maxLength(100)
    linkdinUrl: string = undefined; 
    @maxLength(100)
    twitterUrl: string = undefined;
}
export class UsersSearchViewModel {
    constructor(usersSearchViewModel?: UsersSearchViewModel) {
        let properties = ["roleId", "userName","fullName"];
        for (let property of properties)
            if (usersSearchViewModel && usersSearchViewModel[property])
                this[property] = usersSearchViewModel[property];
    }
    roleId: number = 0;
    @maxLength(50)
    userName: string = "";  
    @maxLength(200)
    fullName: string = ""; 
}

export class UsersLookupGroup {
    roles: Role[];
    languages:vLanguage[];
    applicationTimeZones : vApplicationTimeZone[];
    status:any;
    userList:UsersResultModel[];
    securityQuestions:SecurityQuestion[];
    user:User
    users:vUser[]
}

export class vUser {
    userId: number = 0;
    userName: string = undefined;
    firstName: string = undefined;  
    lastName: string = undefined;  
    facebookUrl: string = undefined;  
    linkdinUrl: string = undefined;  
    twitterUrl: string = undefined;  
}
