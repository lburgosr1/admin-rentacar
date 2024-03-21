import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentACar } from 'src/app/common/models/rent-a-car.model';
import { Customer } from 'src/app/common/models/cusotmer.model';
import { Vehicle } from 'src/app/common/models/vehicle.model';
import { Document } from 'src/app/common/models/document.model';
import { Observable, of, tap } from 'rxjs';
import * as moment from 'moment';
import { SearchesService } from 'src/app/common/services/searches.service';
import { DocumentService } from 'src/app/common/services/document.service';
import { StatusRentACarEnum } from 'src/app/common/constant/enums.constant';
import { CoinsService } from 'src/app/common/services/coin.service';
import { Coin } from 'src/app/common/models/coin.model';

@Component({
  templateUrl: './app-modal-rent-a-car-details.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalRentACarDetailsComponent implements OnInit {

  @Input() rentACar!: RentACar;
  @Output() whenClose = new EventEmitter<RentACar>();
  vehicles: Vehicle[] = [];
  customers: Customer[] = [];
  documents: Document[] = [];
  coins: Coin[] = [];
  form!: FormGroup;
  showSearchesCustomer: boolean = false;
  showSearchesVehicle: boolean = false;
  isSearching:boolean = false;
  searchedCustomers: Customer[] = [];
  searchedVehicles: Vehicle[] = [];
  termCustomer!: string;
  termVehicle!: string;

  constructor(
    private modalRef: BsModalRef,
    private cdr: ChangeDetectorRef,
    private searchesService: SearchesService,
    private documentsService: DocumentService,
    private coinService: CoinsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllDocuments();
    this.getAllCoins();
    this.form.valueChanges.subscribe((value) => {
      if(Number(value.pricePerDay) > 0 && value.daysOfRent) {
        const amount = (Number(this.daysOfRent?.value) * Number(this.pricePerDay?.value)) - Number(this.deposit?.value);
        this.amount?.patchValue(amount, {emitEvent: false});
      }
    })
  }

  accept(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const rentalStartDate = moment(this.rentalStartDate?.value);
    const rentalEndDate = moment(rentalStartDate).add(Number(this.daysOfRent?.value)+1, 'd');

    const rentalEndDateFormat = new Date(rentalEndDate.format('yyyy-MM-DD'));

    const data = {
      ...this.form.value,
      rentalEndDate: rentalEndDateFormat,
      status: StatusRentACarEnum.RENTED,
      deposit: Number(this.deposit?.value),
      daysOfRent: Number(this.daysOfRent?.value),
      pricePerDay: Number(this.pricePerDay?.value)
    };
    this.whenClose.next(data);
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  selectCustomer(customer: Customer): void {
    this.customer?.setValue(customer.customer_id);
    this.termCustomer = `${customer.firstName} ${customer.lastName}`;
    this.showSearchesCustomer = false;
  }

  selectVehicle(vehicle: Vehicle): void {
    this.vehicle?.setValue(vehicle.vehicle_id);
    this.termVehicle = `${vehicle.plate} ${vehicle.typeVehicle.typeVehicle} ${vehicle.brand.brandVehicle} ${vehicle.model.vehicleModel}`
    this.showSearchesVehicle = false;
  }

  getAllDocuments(): void {
    this.documentsService.getAllDocuments().subscribe({
      next: (documents: Array<Document>) => {
        this.documents = documents;
      }
    })
  }

  getAllCoins(): void {
    this.coinService.getAllCoins().subscribe({
      next: (coins: Array<Coin>) => {
        this.coins = coins;
      }
    })
  }

  getCustomersStorage(): void {
    const customers = localStorage.getItem('customers');
    this.customers = customers ? JSON.parse(customers) : [];
  }

  getVehiclesStorage(): void {
    const vehicles = localStorage.getItem('vehicles');
    this.vehicles = vehicles ? JSON.parse(vehicles) : [];
  }

  getCustomers(value: string): Observable<Array<Customer>> {
    return this.searchesService.search('customer', value);
  }

  getVehicles(value: string): Observable<Array<Vehicle>> {
    return this.searchesService.search('vehicle', value);
  }

  custormerSerarch(term: string): void {
    if(!term) {
      this.isSearching = true;
      this.showSearchesCustomer = false;
      return;
    }
    const search$ = this.getCustomers(term).pipe(
      tap(() => {
        this.isSearching = false;
        this.showSearchesCustomer = true;
        this.termCustomer = term;
      }));

      search$.subscribe(data => {
        this.searchedCustomers = data ? data : [];
      })
  }

  vehicleSerarch(term: string): void {
    if(!term) {
      this.isSearching = true;
      this.showSearchesVehicle = false;
      return;
    }
    const search$ = this.getVehicles(term).pipe(
      tap(() => {
        this.isSearching = false;
        this.showSearchesVehicle = true;
        this.termVehicle = term;
      }));

      search$.subscribe(data => {
        this.searchedVehicles = data ? data : [];
      })
  }

  private initForm(): void {
    this.form = this.fb.group({
      vehicle: ['', Validators.required],
      customer: ['', Validators.required],
      document: ['', Validators.required],
      amount: [0, Validators.required],
      deposit: [0, Validators.required],
      daysOfRent: [0, Validators.required],
      pricePerDay: [0, Validators.required],
      rentalStartDate: ['', Validators.required],
      coin: ['', Validators.required],
      notes: [''],
    });
  }

  get vehicle() {
    return this.form.get('vehicle');
  }

  get customer() {
    return this.form.get('customer');
  }

  get document() {
    return this.form.get('document');
  }

  get amount() {
    return this.form.get('amount');
  }

  get coin() {
    return this.form.get('coin');
  }

  get pricePerDay() {
    return this.form.get('pricePerDay');
  }

  get deposit() {
    return this.form.get('deposit');
  }

  get daysOfRent() {
    return this.form.get('daysOfRent');
  }

  get rentalStartDate() {
    return this.form.get('rentalStartDate');
  }
  get notes() {
    return this.form.get('notes');
  }
}
