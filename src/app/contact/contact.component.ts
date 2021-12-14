import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Contact } from '../contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  displayedColumns : string[] = ['id', 'name', 'title', 'email', 'phone', 'address', 'city', 'actions'];
  dataSource = [];
  contact = {
    name: undefined,
    title: undefined,
    email: undefined,
    city: undefined,
    address: undefined,
    phone: undefined,
    id: false
  };
  constructor(private apiService: ApiService) { }
//retrieve the contacts from the server
  ngOnInit() {
    this.apiService.readContacts().subscribe((result) => {
      // @ts-ignore
      this.dataSource = result;
    })
  }
  selectContact(contact: any){
    this.contact = contact;
    console.log("selected: ", this.contact)
  }
  newContact() {
    // @ts-ignore
    this.contact = {};
  }
  createContact(f: any){
    console.log("form value: ", f.value);
    this.apiService.createContact(f.value).subscribe((result) => {
      console.log(result);
    });
  }
  deleteContact(id: any){
    this.apiService.deleteContact(id).subscribe((result) => {
      console.log(result);
    });
  }
  updateContact(f: any){
    console.log("Update", f.value)
    f.value.id = this.contact['id'];
    this.apiService.updateContact(f.value).subscribe((result) =>{
      console.log(result)
    });
  }
}
