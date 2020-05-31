
import {Injectable} from '@angular/core';
import {Contact} from '../model/contact';
import {Observable, of} from 'rxjs';
import {CONTACTS} from '../model/contacts-mock';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ContactService {

  contacts: Observable<Contact[]>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private readonly contactsUrl: string;

  constructor(private http: HttpClient) {
    this.contactsUrl = 'http://localhost:8080';
  }

  public getContacts(): Observable<Contact[]>{
    if(!this.contacts){
     this.contacts= this.http.get<Contact[]>(this.contactsUrl + '/contact');
    }
    return this.contacts;
  }

  public addContact(contact: Contact): void {
     this.http.post<Contact>(this.contactsUrl + '/contact', contact, this.httpOptions)
       .subscribe(value => this.reloadContacts());
  }

  private reloadContacts(){
    this.contacts= this.http.get<Contact[]>(this.contactsUrl + '/contact');
  }

  add(contact: Contact): void {
    contact.id = CONTACTS.length + 1;
    CONTACTS.push(contact);
  }

  getAll(): Observable<Contact[]> {
    return of(CONTACTS);
  }

  edit(contact: Contact) {
  /*const contactToEdit = CONTACTS.find(value => value.id === contact.id);
    Object.assign(contactToEdit, contact);*/

    this.http.put<Contact>(this.contactsUrl + '/contact', contact, this.httpOptions)
      .subscribe(value => this.reloadContacts());
  }

  remove(contactId: number) {
    /*const index = CONTACTS.findIndex(value => value.id === contact.id);
    CONTACTS.slice(index, 1);*/

     this.http.delete(this.contactsUrl + '/contact/' + contactId, this.httpOptions )
       .subscribe(value => this.reloadContacts());

  }
}
