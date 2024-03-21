import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITab } from 'src/app/common/components/app-tabs/tab';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from 'src/app/components/base.component';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { Company } from 'src/app/common/models/company.model';
import { CompanysService } from 'src/app/common/services/company.service';
import { CompanyModel } from './company';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent extends BaseComponent<Company> implements OnInit {

  form!: FormGroup;
  isEdit!: boolean;
  activeTabIndex!: number;
  tabs!: ITab[];
  urlParams = {} as IUrlParams;
  btnHidden!: boolean;

  constructor(
    private companyService: CompanysService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    facadeService: FacadeService,
    elementRef: ElementRef) {
    super(facadeService, elementRef);
  }

  ngOnInit(): void {
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
    });

    this.formInit();
    this.suscriptions();

    if(this.model) {
      if (this.urlParams.companyId) {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid, true);
      } else {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid);
      }
    }
  }

  suscriptions(): void {
    this.facadeService.utils.whenCLickSave$.subscribe((value) => {
      if (value) {
        this.editOrNewCompany();
      }
    });

    this.form.valueChanges.subscribe({
      next: (company: Company) => {
        this.model = company;
      }
    });

    this.form.valueChanges.subscribe(() => {
      if (this.urlParams.companyId) {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid, true);
      } else {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid);
      }
    });
  }

  onSave(): void {
    this.editOrNewCompany();
  }

  getCompanyDetails(companyId: string): void {
    this.startLoading();
    this.companyService.getCompany(companyId).subscribe((company) => {
      this.model = company;
      this.formEdit();
    });
  }

  formEdit(): void {
    this.form.patchValue({
      companyName: this.model.companyName,
      rnc: this.model.rnc,
      message: this.model.message,
      address: this.model.address,
      phone: this.model.phone,
      email: this.model.email
    });
    this.originalModel = this.form.value as Company;
    this.finishLoading();
  }

  formInit(): void {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      rnc: ['', Validators.required],
      maessage: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['']
    });
  }

  editOrNewCompany(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let data;

    data = {
      companyName: this.form.controls['company'].value.trim(),
      rnc: this.form.controls['rnc'].value.trim(),
      message: this.form.controls['message'].value,
      address: this.form.controls['address'].value,
      phone: this.form.controls['phone'].value,
      email: this.form.controls['email'].value
    } as Company;

    if (this.urlParams.isEdit) {
      this.companyService.updateCompany(data, this.urlParams.companyId).subscribe({
        next: (resp) => {
          this.model = resp;
          this.originalModel = this.form.value as Company;
          this.toastr.success('La compañia fue actualizada con exito');
          this.goBack();
        },
        error: (err) => {
          this.toastr.error(err.error.msg);
        }
      })

    } else {
      this.companyService.createCompany(data).subscribe({
        next: (resp) => {
          this.model = resp.company;
          this.originalModel = this.form.value as Company;
          this.toastr.success('La compañia fue agregada con exito');
          this.goBack();
        },
        error: (err) => {
          this.toastr.error(err.error.msg);
        }
      });
    }
  }
}
