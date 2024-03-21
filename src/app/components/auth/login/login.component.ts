import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FacadeService } from 'src/app/common/services/facade.service';
import { UserService } from 'src/app/common/services/user.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm: any;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    facadeServise: FacadeService,
    elementRef: ElementRef
  ){
    super(facadeServise, elementRef);
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      userName: [ localStorage.getItem('userName') || '', Validators.required],
      password: ['', Validators.required],
      remember: [localStorage.getItem('remember') || false]
    });
  }

  login(): void {
    this.formSubmitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.startLoading();

    this.userService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if(this.loginForm.get('remember').value) {
          localStorage.setItem('userName', this.loginForm.get('userName').value);
          localStorage.setItem('remember', this.loginForm.get('remember').value);
        } else {
          localStorage.removeItem('userName');
          localStorage.removeItem('remember');
        }
        this.router.navigateByUrl('/');
        this.finishLoading();
      },
      error: (err) => {
        this.toastr.error(err?.error?.msg);
        this.finishLoading();
      }
    })
  }

  invalidField(field: string): boolean {
    if(this.loginForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
