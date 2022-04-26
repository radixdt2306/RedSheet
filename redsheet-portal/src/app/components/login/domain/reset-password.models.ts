import { required, maxLength, range, } from '@rx/annotations';
export class SecurityVerificationForm  {
    constructor(securityVerificationForm?: SecurityVerificationForm) {
        let properties = ["userName", "verificationCode","password","confirmPassword"];
        for (let property of properties)
            if (securityVerificationForm && securityVerificationForm[property])
                this[property] = securityVerificationForm[property];
    }
    @required()
    @maxLength(100)
    userName:string=undefined;
    @required()
    @maxLength(50)
    password: string = undefined;
    verificationCode: string = undefined;
    @required()
    @maxLength(50)
    confirmPassword:string=undefined;
}

export class SecurityVerificationViewModel  {
    constructor(securityVerificationViewModel?: SecurityVerificationViewModel) {
        let properties = ["userName","securityAnswer"];
        for (let property of properties)
            if (securityVerificationViewModel && securityVerificationViewModel[property])
                this[property] = securityVerificationViewModel[property];
    }
    @required()
    @maxLength(100)
    userName: string = undefined;
    @required()
    securityQuestion: string = undefined;
    @required()
    @maxLength(100)
    securityAnswer:string=undefined;
}

export class ChangeCredentialViewModel  {
    constructor(changeCredentialViewModel?: ChangeCredentialViewModel) {
        let properties = ["userName", "password","confirmPassword"];
        for (let property of properties)
            if (changeCredentialViewModel && changeCredentialViewModel[property])
                this[property] = changeCredentialViewModel[property];
    }
    @required()
    @maxLength(100)
    userName:string=undefined;
    verificationCode: string = undefined;
    @required()
    password: string = undefined;
    @required()
    confirmPassword: string = undefined;
}

export class UserCredentialViewModel  {
    constructor(userCredentialViewModel?: UserCredentialViewModel) {
        let properties = ["userName", "password"];
        for (let property of properties)
            if (userCredentialViewModel && userCredentialViewModel[property])
                this[property] = userCredentialViewModel[property];
    }
    @required()
    @maxLength(100)
    userName:string=undefined;
    password:string=undefined;
}
