import { PersonDetailsService } from './../../services/person-details.service';
import { PersonReport } from '../../interface/person-report';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.css'],
})
export class FormSubmitComponent implements OnInit {
  personDetailsForm: FormGroup;
  fullNameRequiredMessage: string = 'Full name is required.';
  telephoneNumberRequiredMessage: string = 'Telephone number is required.';
  idNumberRequiredMessage: string = 'Id number is required.';
  idIncorrectMessage: string = 'This Id number is not valid.';
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private personDetailsService: PersonDetailsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.personDetailsForm = this.fb.group({
      fullName: new FormControl('', Validators.required),
      identityNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(13),
        this.isIdentityNumberValid.bind(this),
      ]),
      telephoneNumber: new FormControl('', Validators.required),
    });
  }

  onSubmitForm(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.personDetailsService
      .submitPersonDetails(form.value)
      .subscribe((response) => {
        console.log(response);
        if (response.message.includes('registered')) {
          this.snackBar.open('Submitted the form successfully', 'Success!', {duration: 5000});
          this.isSubmitted = false;
        }
      }, err => {
        this.snackBar.open('Unexpected error occurred', 'Error!', {duration: 5000});
        this.isSubmitted = false;
      });
  }

  isIdentityNumberValid(control: FormControl): { [s: string]: boolean } {
    if (control.value.toString().length) {
      this.personDetailsService.validateId(control.value);

      if (!this.personDetailsService.isIdValid) {
        return { isIdIncorrect: true };
      }
      return null;
    }
    return null;
  }
}
