import { required, maxLength, range, nested } from '@rx/annotations';

export class ConfigurationContent {
    constructor(configurationContent?: ConfigurationContent )  {
        let properties = [ "abkhazian", "amharic", "configurationContentId", "configurationContentName", "english", "french", "zulu",];
        for (let property of properties)
            if (configurationContent && configurationContent[property])
                this[property] = configurationContent[property];
    }
 
	abkhazian : string =   undefined;
 
	amharic : string =   undefined;
 
	configurationContentId : number =   0 ;
 
    @required()
	configurationContentName : string =   undefined;
 
    @required()
	english : string =   undefined;
 
	french : string =   undefined;
 
	zulu : string =   undefined;


}
