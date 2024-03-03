import { Component ,ElementRef,Input,OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../apiservice.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})

export class CreateContactComponent {
  values=[]
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Tags: string[] = [];
  foldername:any;
  allcontact:any;
  isModalOpen = true;
  getparamid: any;
  singlecontact:any;
  RelationTags=[];
  Relation=[];
  rtag: any;
  slideToggleValue: boolean = true;
  checked:any;
  active:string = '';

userform= new FormGroup ({
  'name' : new FormControl(''),
  'phone' : new FormControl(''),
  'phone1' : new FormControl(''),
  'email' : new FormControl(''),
  'email1' : new FormControl(''),
  'address' : new FormControl(''),
  'address1' : new FormControl(''),
  'status': new FormControl('Y'),
  'folder' : new FormControl(''),
  'tags' : new FormControl(''),
  'reltag': new FormControl(''),
  'relname': new FormControl(''),
  'relcontact':new FormControl('')
})



@ViewChild('test') testElement! :ElementRef;
  relationCon: any;


usersubmit(){
  const a = this.testElement.nativeElement.value
  this.userform.get('relname')?.setValue(a)


  const aa = this.userform.get('status')?.value
  if (aa) {
    this.active = 'Y'; 
    this.userform.get('status')?.setValue(this.active);
  } else {
    this.checked = false;
    this.active = 'N'
    this.userform.get('status')?.setValue(this.active);
  } 
  
  if(this.userform.valid){
    this.api.createContact(this.userform.value).subscribe((res)=>{
      this.userform.reset();
    })
  }
}

constructor(private http:HttpClient,
  private api:ApiserviceService,
  public modal:ModalService){}

//--------------------------------------- success popup ---------------------------------------


createcontactsavepopup(){
  Swal.fire("Thank you...",'Your contact has been submittend Successfully','success');
}


// -------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.api.folder().subscribe((res) => {
      this.foldername = res.data
    });
    this.getAllContact();

    this.api.rtags().subscribe((res) => {
      this.rtag = res.data
  })

  this.api.relcontact().subscribe((res)=>{
    this.relationCon = res.data
  })
}


//------------------------------POPUP Process------------------------------------------------
  public items =[

  ]
// ---------------------------------------------------------------------------

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


getAllContact(){
  this.api.getAllContact().subscribe((res)=>{
    this.allcontact = res.data
  });
}


getSingle(contact_Id:any){
  this.api.getSingleCotact(contact_Id).subscribe((res)=>{
    this.singlecontact = res.data
  })
}

getname(){
  const name = this.userform.get('relcontact')?.value;
  const tagname = this.userform.get('reltag')?.value;
  return `${name}'s ${tagname}`
}
}