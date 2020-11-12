import { AbstractControl, ValidationErrors } from '@angular/forms';

export class InputValidator {

    static noWhiteSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return {noWhiteSpace: true}
        }
        return null;
    }

    static noFullWhiteSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).length>0 && !((control.value as string).trim().length > 0)){
            return {noFullWhiteSpace: true}
        }
        return null;
    }
}
