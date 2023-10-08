export interface ICompanyContact {
  firstName: string;
  lastName:  string;
  department: string;
  contacts:  IContact[];
  emails:    IEmail[];
  isCollapsed?: boolean;
  _id:       string;
}

export interface ICustomerContact {
  contacts:  IContact[];
  emails:    IEmail[];
  isCollapsed?: boolean;
  _id:       string;
}

export interface IContact {
  type:      string;
  contactNo: string;
  extNo?:    string;
  isPrimary: boolean;
  _id:       string;
}

export interface IEmail {
  email: string;
  isPrimary: boolean;
  _id:   string;
}

export enum TypeContact {
  Home = 'home',
  Office = 'office',
  CellPhone = 'cellPhone'
}
