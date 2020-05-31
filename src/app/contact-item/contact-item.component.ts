
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../model/contact';
import {ContactService} from '../service/contact.service';
import {ContactEventService} from "../service/contact-event.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input()
  contact: Contact;

  @Input()
  contacts: Contact[];


/*
  @Output()
  edit: EventEmitter<Contact>= new EventEmitter(); //event posilaet contact
*/

  constructor(private contactService: ContactService,
              private contactEventService: ContactEventService) {
  }

  ngOnInit(): void {

  }

  OnClickEdit() {
    this.contactEventService.emitEditContact(this.contact);
  }

  onClickDelete() {
    this.contactService.remove(this.contact.id);
  }
}
