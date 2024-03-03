import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-inactivecontact',
  templateUrl: './inactivecontact.component.html',
  styleUrls: ['./inactivecontact.component.css']
})
export class InactivecontactComponent implements OnInit {

  active = '';
  inActiveContact:any
  singlecontact:any
  id:any[] = [];
  message:any;
 @Input() inActive: any;
  constructor(private api:ApiserviceService){}

  ngOnInit(): void {
  }

  InAct(){
    this.api.Inactivecontact().subscribe((res)=>{
      this.inActive = res.data
    })
  }

  inactive = new FormGroup({
    'id': new FormControl(['']),
  });

  chekedpopup(){
    Swal.fire("Thank you...",'Your contact has been Activated','success')
  }

  notchekedpopup(){
    Swal.fire("Warning",'select any checkbox to Activate the contact','warning')
  }
  getId(contact_Id: any) {
    this.api.getSingleCotact(contact_Id).subscribe((res) => {
      this.singlecontact = res.data
      this.id = contact_Id
  })
}

updateSelectedContacts(contact_id: number, event: any) {
  if (event.target.checked) {
    this.id.push(contact_id);
  } else {
    const index = this.id.indexOf(contact_id);
    if (index > -1) {
      this.id.splice(index, 1);
    }
  }
}
  onsubmit() {
    if(this.inactive.valid){
      this.inactive.get('id')?.setValue(this.id);
        this.api.inactivetoactive(this.inactive.value).subscribe((res)=>{
          this.message = res.message
        })
        this.chekedpopup();
      }
this.InAct();
     }
}
