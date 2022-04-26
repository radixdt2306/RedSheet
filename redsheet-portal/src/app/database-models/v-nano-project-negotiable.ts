import { required, maxLength, range, nested } from '@rx/annotations';

export class vNanoProjectNegotiable {
    constructor(vNanoProjectNegotiable?: vNanoProjectNegotiable )  {
        let properties = [ "ldo", "mdo", "nanoProjectNegotiableId", "projectModuleId", "requirement",];
        for (let property of properties)
            if (vNanoProjectNegotiable && vNanoProjectNegotiable[property])
                this[property] = vNanoProjectNegotiable[property];
    }
 
    @required()
    @maxLength(1000)
	ldo : string =   undefined;
 
    @required()
    @maxLength(1000)
	mdo : string =   undefined;
 
	nanoProjectNegotiableId : number =   0 ;
 
    @range(1,2147483647)
	projectModuleId : number =   undefined;
 
    @required()
    @maxLength(1000)
	requirement : string =   undefined;


}
