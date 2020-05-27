import {Component, OnInit} from '@angular/core';
import {Contact} from '../model/contact';
import {ContactService} from '../service/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contact: Contact;
  contacts: Contact[];

  isAddingState: boolean;


  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.isAddingState = true;
    this.contact = new Contact();
  }
  onClickAdd(){
    console.log(this.contact);
    this.contactService.addContact(this.contact)
    this.clearForm();

     // .subscribe(value => this.clearForm());
  }

  /*onClickAdd() {
    console.log(this.contact);
    this.contactService.add(this.contact);
  }*/
  clearForm(){
    this.contact = new Contact();
  }


  onClickGetAll() {
    this.contactService.getContacts()
      .subscribe(value => this.contacts = value);
    console.log(this.contacts);
  }
}
