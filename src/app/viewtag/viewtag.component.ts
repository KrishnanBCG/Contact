import { Component , EventEmitter, OnInit , Output, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';






@Component({
  selector: 'app-viewtag',
  templateUrl: './viewtag.component.html',
  styleUrls: ['./viewtag.component.css']
})


export class ViewtagComponent implements OnInit {


  @Output() sideNavToggled = new EventEmitter <boolean>();
  menuStatus : boolean = false;
  displayedColumns: string[] = ['name', "Merge" ,"Getdetails" , "checkbox", "Active"];
  dataSource: MatTableDataSource<any>;
  tags:any;
 


  constructor(private api:ApiserviceService){
    this.dataSource = new MatTableDataSource();
  }

   ngOnInit() {
    this.fetchtag();
   }

   fetchtag(){
    this.api.tags().subscribe((res)=>{
      this.tags = res.data;
      this.dataSource = this.tags;
    });
  }

  SideNavToggle(){
    this.menuStatus=!this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus)
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue;
  }

viewtags = new FormGroup({
      'merge'  : new FormControl(''),
      'active' : new FormControl(''),
    })

    viewsubmit(){
      if(this.viewtags.valid){
        console.log(this.viewtags.value)
      }
    }


    viewtagsavepopup(){
        Swal.fire("Thank you...",'you submittend Successfully','success')
    }


    conformation(){
  Swal.fire({
    title: 'Are you sure?',
    text: "You want merge all tags in this Tags",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Merge it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Merged! ',
        'Your Tags has been Merged.',
        'success'
      )
    }
  })
}

}

////////////////////////Table process///////////////////////////////////////////
export interface PeriodicElements {
  name: string;
}

