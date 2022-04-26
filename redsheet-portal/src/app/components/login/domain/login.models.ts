export class UserCredentialModel {
    username: string;
    password: string;
    failedCount: number;
    userId:number;
}

export class UserAuthenticationViewModel {
    academyUrl: string;
    token: string;
    modules: any;
    roleId: number;
    fullName: string;
    userName: string;
    failedCount: number;
    failedLogin: boolean;
    validationMessage: string;
    userId:number;
}