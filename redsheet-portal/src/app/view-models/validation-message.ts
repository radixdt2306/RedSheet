export class ValidMessage {
    maximumCharacter: string;
    remainedOrExceededCharacters: string;
    isError: boolean;

    static onSearchChangesCommon(currentValueLength: any, maxLength: number, isFirstTime: boolean = false): ValidMessage {
        let validMessage = new ValidMessage();

        validMessage.maximumCharacter = 'Maximum ' + maxLength + ' characters ';
        
        if (!isFirstTime && currentValueLength) {
            if (currentValueLength.length <= maxLength) {
                let count = maxLength - currentValueLength.length;
                validMessage.remainedOrExceededCharacters = '( ' + count + ' remaining )';
                validMessage.isError = false;
            } else {
                let count = currentValueLength.length - maxLength;
                validMessage.remainedOrExceededCharacters = '( ' + count + ' too many )';
                validMessage.isError = true;
            }
        }
        return validMessage;
    }
}