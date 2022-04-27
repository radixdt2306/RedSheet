import { required, maxLength, range, nested } from '@rx/annotations';
import { NanoScopeToNegotiateObjective,  } from './'
export class NanoScopeToNegotiate {
    constructor(nanoScopeToNegotiate?: NanoScopeToNegotiate )  {
        let properties = [ "className", "nanoScopeToNegotiateId", "nanoScopeToNegotiateName", "nanoScopeToNegotiateObjectives",];
        for (let property of properties)
            if (nanoScopeToNegotiate && nanoScopeToNegotiate[property])
                this[property] = nanoScopeToNegotiate[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	nanoScopeToNegotiateId : number =   0 ;
 
    @required()
    @maxLength(200)
	nanoScopeToNegotiateName : string =   undefined;
	@nested(NanoScopeToNegotiateObjective)
	nanoScopeToNegotiateObjectives: NanoScopeToNegotiateObjective[];



}
