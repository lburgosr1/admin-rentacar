export interface IAddress {
  type: string;
  street: string;
  number: number;
  building: string;
  apartment: string;
  city: string;
  sector: string;
  isPrimary: boolean;
  _id: string;
}

export enum TypeAddress {
  Home = 'home',
  Office = 'office'
}
