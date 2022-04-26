import { vUser, UsersResultModel } from "../../users/domain/users.models";
import {User, SecurityQuestion, Role, vLanguage, vApplicationTimeZone } from "app/database-models";
import { required, maxLength, nested } from '@rx/annotations';
export class UserProfileLookupGroup {
    roles: Role[];
    activeLanguages:vLanguage[];
    applicationTimeZone : vApplicationTimeZone[];
    userList:UsersResultModel[];
    securityQuestions:SecurityQuestion[];
    user:User
    users:vUser[]
}

export class UserProfileModel{
    constructor(user?: UserProfileModel)  {
        let properties = [ "forename", "position", "middlename", "companyName", "email", "surname", "telephone", "uniqueIdentity", "title", "contactAddress", "postcode"];
        for (let property of properties)
            if (user )
                this[property] = user[property];
    }

    @required()
    @maxLength(50)
    forename:string;

    @maxLength(50)
    position:string;

    @maxLength(50)
    middlename:string;

    @required()
    @maxLength(50)
    email:string;

    @required()
    @maxLength(50)
    surname:string;

    @maxLength(50)
    telephone:string;

    @required()
    uniqueIdentity:string;

    @maxLength(20)
    title:string;

    @maxLength(4000)
    contactAddress:string;

    @maxLength(50)
    postcode:string;
}