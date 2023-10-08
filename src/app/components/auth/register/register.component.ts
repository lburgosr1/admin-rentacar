import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/common/services/user.service';
import { BaseComponent } from '../../base.component';
import { FacadeService } from 'src/app/common/services/facade.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {

  registerForm: any;
  formSubmitted = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              facadeService: FacadeService){
                super(facadeService)
              }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [false, Validators.required]
    }, {
      validators: this.samePasswords('password', 'password2')
    });
  }

  createUser(): void {
    this.formSubmitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.toastr.error(err?.error?.msg);
      }
    })
  }

  invalidField(field: string): boolean {
    if(this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  invalidPassword(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  samePasswords(pass1: string, pass2: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value) {
        pass1Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({isNotSame: true})
      }
    }
  }
}
