import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../model/contact';
import {ContactService} from '../service/contact.service';
import {ContactEventService} from "../service/contact-event.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, OnDestroy {

  contact: Contact;

  isAddingState: boolean;

  editContactSub: Subscription;

  constructor(private contactService: ContactService,
              private contactEventService: ContactEventService) {

  }

  ngOnInit(): void {
  this.clearForm();
  this.editContactSub= this.contactEventService.subscribeEditContact((value)=>this.onEditContact(value));
  }

  ngOnDestroy(): void {
   this.editContactSub.unsubscribe();
  }

  onClickAdd(){
    console.log(this.contact);
    this.contactService.addContact(this.contact)
    this.clearForm();
  }

  clearForm(){
    this.contact = new Contact();
    this.isAddingState = true;
  }

  onClickEdit() {
   this.contactService.edit(this.contact);
   this.clearForm();
  }

  onClickCancel() {
    this.clearForm();
  }

  onEditContact(value: Contact){
    this.contact = value;
    this.isAddingState = false;
  }
}
