import { required, maxLength, range, nested } from '@rx/annotations';

export class vCommunicationMode {
    constructor(vCommunicationMode?: vCommunicationMode )  {
        let properties = [ "className", "communicationModeId", "communicationModeName",];
        for (let property of properties)
            if (vCommunicationMode && vCommunicationMode[property])
                this[property] = vCommunicationMode[property];
    }
 
    @required()
    @maxLength(200)
	className : string =   undefined;
 
	communicationModeId : number =   0 ;
 
    @required()
    @maxLength(200)
	communicationModeName : string =   undefined;


}
