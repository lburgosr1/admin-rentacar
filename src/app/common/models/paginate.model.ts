export interface IPagination {
  term: string;
  page: number;
  count: number;
  totalRecord: number;
  maxSize: number;
}

export class Pagination {

  public term: string;
  public page: number;
  public count: number;
  public totalRecord: number;
  public maxSize: number;

  constructor() {
    this.term = '';
    this.page = 1;
    this.count = 10;
    this.totalRecord = 0;
    this.maxSize = 1;
  }
}
