import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { TDSHelperObject } from 'tds-ui/shared/utility';

type ValidateFnCallback<T> = (self: FormControl, target: FormControl) => T;

const watchControl = <T extends ValidatorFn = ValidatorFn>(
  targetControlName: string,
  validate: ValidateFnCallback<ReturnType<T>>
) => {
  let target: FormControl | null = null;
  return (control: FormControl) => {
    const form = control.root as FormGroup;
    let temp: FormControl;
    if (!form || !form.controls || !(temp = form.get(targetControlName) as FormControl)) {
      return of(null);
    }

    if (target !== temp) {
      target = temp;
      target.valueChanges.subscribe(() => control.updateValueAndValidity({ onlySelf: true }));
    }
    return validate(control, target);
  };
};

const EMAIL_REGEX_WITH_DOMAIN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
// const MOBILE_TEN_DIGIT = /^(\+)?(84|0)(3|5|7|8|9)[0-9]{8}$/;
const MOBILE_TEN_DIGIT = /^(\+84|84|0|)?(3|5|7|8|9)[0-9]{8}$/;
const MOBILE_TEN_DIGIT_WITHOUT_PLUS = /^(84|0|)?(3|5|7|8|9)[0-9]{8}$/;

export class CoreValidators {
  static isEmail(control: AbstractControl): ValidationErrors | null {
    if (!control?.value) {
      return null;
    }

    return EMAIL_REGEX_WITH_DOMAIN.test(control.value) ? null : { isEmail: true };
  }

  static isMobile(control: AbstractControl): ValidationErrors | null {
    if (!control?.value) {
      return null;
    }

    return MOBILE_TEN_DIGIT.test(control.value) ? null : { isMobile: true };
  }

  static isMobileWithoutPlus(control: AbstractControl): ValidationErrors | null {
    if (!control?.value) {
      return null;
    }

    return MOBILE_TEN_DIGIT_WITHOUT_PLUS.test(control.value) ? null : { isMobile: true };
  }

  static isEmailOrMobile(control: AbstractControl): ValidationErrors | null {
    if (control?.value == null) {
      return null;
    }

    const errors = control.value.includes('@') ? CoreValidators.isEmail(control) : CoreValidators.isMobile(control);
    return errors === null ? null : { isEmailOrMobile: true };
  }

  static passwordMatch(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent || !parent.value) {
        return null;
      }
      const password = (parent?.controls as any)[matchTo].value;
      const repassword = control.value;

      return password === repassword ? null : { passwordMismatch: true };
    };
  }

  static smaller(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;

      if (!parent || !parent.value) {
        return null;
      }

      const matchControl = (parent?.controls as any)[matchTo];
      const matchValue = matchControl.value;
      const value = control.value;

      return value >= matchValue ? null : { smaller: true };
    };
  }

  static minDate(control: AbstractControl): ValidationErrors | null {
    if (!control?.value && !TDSHelperObject.hasValue(control.errors)) {
      return control.errors;
    }
    return new Date(control.value).getTime() <= new Date().getTime() ? { minDate: true } : null;
  }

  static setMin(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;

      if (!parent || !parent.value) {
        return null;
      }

      const matchControl = parent.get(matchTo);
      const value = control.value;
      matchControl?.clearValidators();
      matchControl?.setValidators([Validators.min(value + 1)]);
      matchControl?.updateValueAndValidity();
      return control.errors;
    };
  }

  static setMax(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;

      if (!parent || !parent.value) {
        return null;
      }

      const matchControl = parent.get(matchTo);
      const value = control.value;
      matchControl?.clearValidators();
      if (value > 0) matchControl?.setValidators([Validators.max(value-1)]);
      matchControl?.updateValueAndValidity();
      return control.errors;
    };
  }
}
export function convertPhoneNumber(phoneNumber: string) {
  let arrPhone = phoneNumber.split('');
  if (arrPhone[0] == '+') {
    arrPhone.shift();
  }
  let phoneString = arrPhone.join('');
  if (phoneString.startsWith('84')) {
    var param = phoneString.replace('84', '0');
  } else {
    param = phoneString;
  }
  return param;
}
