import { required, maxLength, range, nested } from '@rx/annotations';

export class vLiteBackgroundCommunicationMode {
    constructor(vLiteBackgroundCommunicationMode?: vLiteBackgroundCommunicationMode )  {
        let properties = [ "communicationModeId", "communicationModeName", "liteBackgroundCommunicationModeId", "liteProjectBackgroundId",];
        for (let property of properties)
            if (vLiteBackgroundCommunicationMode && vLiteBackgroundCommunicationMode[property])
                this[property] = vLiteBackgroundCommunicationMode[property];
    }
 
	communicationModeId : number =   0 ;
 
    @required()
    @maxLength(200)
	communicationModeName : string =   undefined;
 
    @range(1,2147483647)
	liteBackgroundCommunicationModeId : number =   undefined;
 
    @range(1,2147483647)
	liteProjectBackgroundId : number =   undefined;


}
