export enum TypeCollection {
  'users' = 1,
  'companies',
  'customers',
  'policies'
}

export enum TypeRoleUser {
  User = 'USER_ROLE',
  Admin = 'ADMIN_ROLE',
  Agent = 'AGENT_ROLE'
}

export enum TypeTransaction {
  CreditNote = 'creditNote',
  Cash = 'cash',
  CrediCard = 'card',
  BankCheck = 'bankCheck',
  Transfer = 'transfer',
  Discount = 'discount',
  TaxExemption = 'taxExemption'
}

export enum Status {
  All = 'all',
  Active = 'active',
  Cancelled = 'cancelled'
}

export enum Currency {
  RD = 'RD',
  US = 'US',
  EUR = 'EUR'
}
