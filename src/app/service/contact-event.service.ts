import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "../model/contact";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactEventService {

editContactEvent: EventEmitter<Contact> = new EventEmitter<Contact>(); // contact eto to chto mi v evente peredam

  constructor() {

  }

  emitEditContact(contact: Contact ): void{
    this.editContactEvent.emit(contact);
  }
  subscribeEditContact(callback): Subscription{
  const  subscription: Subscription = this.editContactEvent.subscribe(callback);
  return subscription;
  }

}
