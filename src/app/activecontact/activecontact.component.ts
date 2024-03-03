import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-activecontact',
  templateUrl: './activecontact.component.html',
  styleUrls: ['./activecontact.component.css']
})
export class ActivecontactComponent implements OnInit{


  ActiveContact:any;
  singlecontact:any;
  id:any[] = [];
  message:any;
 @Input() active_con: any;
  constructor(private api:ApiserviceService){}

  ngOnInit(): void {
this.Act();
  }

  Act(){
    this.api.Activecon().subscribe((res)=>{
      this.active_con = res.data
    });
  }

  active = new FormGroup({
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

updateContacts(contact_id: number, event: any) {
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
    if(this.active.valid){
      this.active.get('id')?.setValue(this.id);
        this.api.activetoinactive(this.active.value).subscribe((res)=>{
          this.message = res.message
        })
        this.chekedpopup();
      }
this.Act();
     }
}