import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  formSubmitted = false;
  loading = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private ngZone: NgZone){}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [ localStorage.getItem('email') || '', Validators.required],
      password: ['', Validators.required],
      remember: [localStorage.getItem('remember') || false]
    });
  }

  login(): void {
    this.formSubmitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if(this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem('remember', this.loginForm.get('remember').value);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.toastr.error(err?.error?.msg);
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
