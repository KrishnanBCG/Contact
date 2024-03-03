import { Component , OnInit , ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-create-tags',
  templateUrl: './create-tags.component.html',
  styleUrls: ['./create-tags.component.css']
})



export class CreateTagsComponent implements OnInit {
  
  values: string[] | undefined;
  type:any;
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Tags: string[] = [];
  foldername:any;
  rtag:any;



constructor( private api:ApiserviceService ){}


ngOnInit(): void {
  this.api.type().subscribe((res)=>{
    this.type = res.data
  })
}


//--------------------------- data display on console ------------------------------------------------------------------------------------------
createtag = new FormGroup({

  type  : new FormControl(''),
  tagname : new FormControl('')

})

tagsubmit(){
  if(this.createtag.valid){ 
    this.api.createtag(this.createtag.value).subscribe((res)=>{
    })
  this.createtag.reset();
  }
}

add(event: MatChipInputEvent): void {
  const input = event.chipInput.inputElement;
  const value = (event.value || '').trim();
  if (value) {
    this.Tags.push(value);
  }
  if (input) {
    input.value = '';
  }
}
remove(tag: string): void {
  const index = this.Tags.indexOf(tag);

  if (index >= 0) 
  {
    this.Tags.splice(index, 1);
  }
}

folderName(){
  this.api.folder().subscribe((res) => {
    this.foldername = res.data
  });
}
relationtagName(){
  this.api.rtags().subscribe((res) => {
    this.rtag = res.data
  })
}
//-------------------------------Popup Process---------------------------------------------
  public items =[
  ]
// ------------------------------------------------------------------------------------------
createtagspopup(){
  Swal.fire("Thank you...",'Your Tags has been created Successfully','success')
}
// ----------------------------------------------------------------------------------------


}

  

