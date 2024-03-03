import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {
listofcontact:any
foldername:any
  constructor(private api:ApiserviceService){}


folder:any
  ngOnInit(): void {
this.Folder();
  }


  Folder(){
    this.api.folder().subscribe((res) => {
      this.folder = res.data
    })
  }

contactlist(Foldercontact:any){
  this.foldername = Foldercontact;
  this.api.foldercontactlist(Foldercontact).subscribe((res)=>{
  this.listofcontact = res.data
  console.log(this.listofcontact)
  console.log(Foldercontact)
  })
}
  }


