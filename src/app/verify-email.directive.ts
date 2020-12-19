import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appVerifyEmail]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: VerifyEmailDirective,
    multi: true
  }]
})


export class VerifyEmailDirective implements Validator {
  @Input('emailToVerify') emailVerify: string;

  emailVerifier(emailVerify: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const verified = emailVerify === control.value;
      return verified ? { emailVerify: { value: control.value } } : null;
    };
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.emailVerify ? this.emailVerifier(this.emailVerify)(control) : null;
  }

  constructor() { }

}
