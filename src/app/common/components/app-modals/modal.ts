export interface IModalCustomMessage {
  buttonTextConfirmation: string;
  buttonTextCancel: string;
  buttonSubmit: string;
  title: string;
  titleClass: string;
  body: string;
  bodyAdditional: string;
}

export class Modal implements IModalCustomMessage {
  buttonTextConfirmation: string;
  buttonTextCancel: string;
  buttonSubmit: string;
  title: string;
  titleClass: string;
  body: string;
  bodyAdditional: string;

  constructor() {
    this.buttonTextConfirmation = 'Accept';
    this.buttonTextCancel = 'Cancel';
    this.buttonSubmit = 'Submit';
    this.title = '';
    this.titleClass = '';
    this.body = '';
    this.bodyAdditional = '';
  }
}
