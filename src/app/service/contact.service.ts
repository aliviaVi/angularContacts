
import {Injectable} from '@angular/core';
import {Contact} from '../model/contact';
import {Observable, of} from 'rxjs';
import {CONTACTS} from '../model/contacts-mock';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ContactService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private readonly contactsUrl: string;

  constructor(private http: HttpClient) {
    this.contactsUrl = 'http://localhost:8080';
  }

  public getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.contactsUrl + '/contact');
  }

  public addContact(contact: Contact){
    return this.http.post<Contact>(this.contactsUrl + '/contact', contact, this.httpOptions);
  }

  add(contact: Contact): void {
    contact.id = CONTACTS.length + 1;
    CONTACTS.push(contact);
  }

  getAll(): Observable<Contact[]> {
    return of(CONTACTS);
  }
}
