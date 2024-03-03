import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public removeClass = true;


  setRemoveClass(value: boolean) {
    this.removeClass = value;
  }

  getRemoveClass() {
    return this.removeClass
  }
}
