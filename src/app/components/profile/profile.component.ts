import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/common/models/user.model';
import { FileUploadService } from 'src/app/common/services/file-upload.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  formProfile!: FormGroup;
  user!: User;
  imageUpload!: File;
  imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private fileUploadService: FileUploadService){}

  ngOnInit(): void {
    this.user = this.userService.user;
    this.initForm();
  }

  initForm(): void {
    this.formProfile = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required]
    });
  }

  updateProfile(): void {
    this.userService.uptadeProfile(this.formProfile.value).subscribe({
      next: (resp) => {
        this.toastr.success('Perfil Actualizado');
        this.user.setUserProfile(this.formProfile.value);
      },
      error: (err) => {
        if(err?.error?.errors) {
          Object.entries(err?.error?.errors).forEach(([key, value]: any) => {
            this.toastr.error(value.msg);
          });
        } else {
          this.toastr.error(err?.error?.msg);
        }
      }
    })
  }

  changeImage(event: any) {
    this.imageUpload = event?.target?.files[0];

    if(!event?.target?.files[0]) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event?.target?.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage(): void {
    const id = this.user.user_id || '';
    this.fileUploadService
      .updateFile(this.imageUpload, 'users', id)
      .then(img => {
        this.toastr.success('Imagen actualizada')
        this.user.image = img;
      })
      .catch (error => {
        this.toastr.error(error.msg);
      })
  }

}
