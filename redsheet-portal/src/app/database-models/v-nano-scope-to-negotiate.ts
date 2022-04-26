import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoScopeToNegotiate {
    constructor(vNanoScopeToNegotiate?: vNanoScopeToNegotiate )  {
        let properties = [ "className", "nanoScopeToNegotiateId", "nanoScopeToNegotiateName",];
        for (let property of properties)
            if (vNanoScopeToNegotiate && vNanoScopeToNegotiate[property])
                this[property] = vNanoScopeToNegotiate[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	nanoScopeToNegotiateId : number =   0 ;
 
    @required()
    @maxLength(200)
	nanoScopeToNegotiateName : string =   undefined;


}
