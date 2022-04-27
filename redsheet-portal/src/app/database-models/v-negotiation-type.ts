import { required, maxLength, range, nested } from '@rx/annotations';

export class vNegotiationType {
    constructor(vNegotiationType?: vNegotiationType )  {
        let properties = [ "className", "negotiationTypeId", "negotiationTypeName",];
        for (let property of properties)
            if (vNegotiationType && vNegotiationType[property])
                this[property] = vNegotiationType[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	negotiationTypeId : number =   0 ;
 
    @required()
    @maxLength(200)
	negotiationTypeName : string =   undefined;


}
