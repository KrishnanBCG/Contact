import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AppRoutingModule } from './app-routing.module';
import  emailjs  from '@emailjs/browser'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'contact-2';
  hide=true;
  lowemail:string | undefined;
  searchQuery: string = '';
  searchResults: any;
  @Input() sideNavStatus: boolean = false;
  table = false;
  values = []
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Tags: string[] = [];
  foldername: any;
  rtag: any;
  allcontact: any;
  isModalOpen = true;
  getparamid: any;
  singlecontact: any;
  tags: string[] = [];
  id: any;
  slideToggleValue: boolean = true;
  Relation = [];
  RelationTags = [];
  relationContact: any;
  displayedColumns: string[] = ['name', 'phonenumber', 'email', 'getdetails'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([]);
  checked: any;
  active: string = '';
  close: boolean = false;
  singlecontagswithnull: string[] = [];
  singlecontags: string[] = [];
  deletetag: any;
  updatetags:any[] = [];
  user : any;
  pass : any;
  login = this.router.login;
  mainpage = this.router.mainpage;
  forgetdetails:any



  activeStatus() {
    if (this.active == 'N') {
      this.checked = false
    }
  }

  // =========== Constructor =============================
  constructor(private api: ApiserviceService, 
              private http: HttpClient,
              private router:AppRoutingModule) { }
  // =========== OnInit ============================

  ngOnInit(): void {
    this.folderName();
    this.relationtagName();
    this.logindetails();

  }
  // ========================================

  createcontactsavepopup() {
    Swal.fire("Thank you...", 'Your contact has been Updated Successfully', 'success')
  }

  // ========= form group ======================
  folderValue = new FormControl();
  rtagValue = new FormControl();
  tagValue = new FormControl();

  userform = new FormGroup({
    'name': new FormControl(''),
    'phone': new FormControl(''),
    'phone1': new FormControl(''),
    'email': new FormControl(''),
    'email1': new FormControl(''),
    'address': new FormControl(''),
    'address1': new FormControl(''),
    'status': new FormControl(''),
    'tags': new FormControl<string[]>([]),
    'folderValue': new FormControl(''),
    'rtagValue': new FormControl(''),
    'relname': new FormControl(''),
    'relcontact': new FormControl(''),
    'reldummy': new FormControl('')
  })

  @ViewChild('testing') testElement!: ElementRef;
  @ViewChild('relcontactInput') relcontactInput!: ElementRef;

  // ========================= User Update ============================================================================

  userupdate() {
    let a = this.testElement.nativeElement.value;
    this.userform.get('relname')?.setValue(a);
    const inputElement = document.getElementById('test') as HTMLInputElement;
    const selectedValue = inputElement.value;
    const selectedOption = document.querySelector(`datalist#relation option[value="${selectedValue}"]`);

    if (selectedOption) {
      const rel_id = selectedOption.getAttribute('data-contactId');
      if (rel_id) {
        this.userform.get('relcontact')?.setValue(rel_id);
      }
    }

    this.deletetag = this.userform.get('tags')?.value;
    if(this.singlecontags.length > this.deletetag.length){
      this.deletetags();
    }
    this.userform.get('tags')?.setValue(this.deletetag)

    const aa = this.userform.get('status')?.value;

    if (aa) {
      this.active = 'Y';
      this.userform.get('status')?.setValue(this.active);
    } else {
      this.checked = false;
      this.active = 'N'
      this.userform.get('status')?.setValue(this.active);
    }

    if (this.userform.valid) {
      this.api.updateContact(this.userform.value, this.id).subscribe((res) => {
        console.log(res, "Contact Updated Successfully");
      })  
    }
    else {
      console.log("Error while updating the contact");
    } 

    console.log(this.userform.value)
    this.onInputChange();
    this.singlecontags.length = 0;
  }
// ==========================================================================================================================

  deletetags() {
    while(this.deletetag.length < this.singlecontags.length){
        this.deletetag.push(null);
      }
  }

// ---------------------------------------------------------------------------------------------------------------------------

  button() {
    this.close = true;
  }


  // ================================================================================================================================



  //   ======== Main Search ========

  onInputChange() {
    if (this.searchQuery != '') {
      // this.http.get<any>(`http://localhost:4000/search?name=${this.searchQuery}`).subscribe((res) => {
        this.http.get<any>(`https://capable-jelly-9d498a.netlify.app/.netlify/functions/app/search?name=${this.searchQuery}`).subscribe((res) => {
        this.searchResults = res.result,
          this.dataSource = this.searchResults;
        this.table = true;
      });
    }
    else {
      this.table = false;
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------------

  folderName() {
    this.api.folder().subscribe((res) => {
      this.foldername = res.data
    });
  }

  relationtagName() {
    this.api.rtags().subscribe((res) => {
      this.rtag = res.data
    })
  }
  relationContactname() {
    this.api.relcontact().subscribe((res) => {
      this.relationContact = res.data
    })
  }
  logindetails(){
    this.api.login().subscribe((res) => {
      this.user = res.data
    })
  }


  // --------------------------------------------------------------------------------------------------------------------------

  singlecontacttags(contact_Id: any) {
    this.api.getSingleCotact(contact_Id).subscribe((res) => {
      this.singlecontagswithnull = res.tags
      for (let tag of this.singlecontagswithnull) {
        if (tag != null) {
          this.singlecontags.push(tag);
        }
      }
      console.log(this.singlecontags)
    })
  }

  // -----------------------------------------------------------------------------------------------------------------------------


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

    if (index >= 0) {
      this.Tags.splice(index, 1);
    }
  }
  // ---------------------------------------------------------------------------------------------------------------------------
  getId(contact_Id: any) {
    this.getsingledata(contact_Id);
  }

  getsingledata(contact_Id: any) {
    this.api.getSingleCotact(contact_Id).subscribe((res) => {
      this.singlecontact = res.data
      this.tags = res.tags
      this.folderValue.patchValue(res.data[0].folder);
      this.rtagValue.patchValue(res.data[0].reltag);
      this.id = contact_Id;
      if (this.id == contact_Id) {
        this.Tags = [];
        for (let tag of this.tags) {
          if (tag != null) {
            this.Tags.push(tag);
          }
        }
      }
      if (res.data[0].contact_status == "N") {
        this.checked = false;
        this.active = "N"
        this.userform.get('status')?.patchValue(this.active);
      }
      else {
        this.checked = true;
        this.active = "Y"
        this.userform.get('status')?.patchValue(this.active);
      }

      this.userform.get('tags')?.patchValue(this.Tags);
      this.userform.patchValue({
        'name': res.data[0].contact_name,
        'phone': res.data[0].contact_phone,
        'phone1': res.data[0].contact_phone1,
        'email': res.data[0].contact_email,
        'email1': res.data[0].contact_email1,
        'address': res.data[0].contact_address,
        'address1': res.data[0].contact_address1,
        'folderValue': res.data[0].folder,
        'rtagValue': res.data[0].reltag,
        'reldummy': res.data[0].relcontactno
      })
    })
    this.relationContactname();
    this.singlecontacttags(contact_Id);
  }
// ---------------------------------------------------------------------------------------------------------------------------
  getname() {
    const name = this.userform.get('reldummy')?.value;
    const tagname = this.userform.get('rtagValue')?.value;
    return `${name}'s ${tagname}`
  }
  @ViewChild('closebutton') closebutton: any;

  onsave() {
    const acti = this.userform.get('status')?.value
    if (!acti) {
      this.closebutton.nativeElement.click();
    }
  }

  loginform = new FormGroup({
    'username': new FormControl(''),
    'password' : new FormControl('')
  })

  onSubmit() {
    for(let log of this.user){
    if (this.loginform.get('username')?.value == log.email  && this.loginform.get('password')?.value == log.password) {
      this.login = false;
      this.mainpage = true;
    }
  }
  }

  regform = new FormGroup({
    'regname': new FormControl(''),
    'regemail': new FormControl(''),
    'regmobile': new FormControl(''),
    'regpassword': new FormControl(''),
    'conpassword': new FormControl('')
  })

  registeruser(){
    console.log(this.regform.value)
    this.api.userregister(this.regform.value).subscribe((res)=>{
      if(res.message == "ok"){
        alert("Login details Registered successfully")
      }
    })
    this.regform.reset();
  }
  show=false;
  showpassword(){
    this.show=!this.show;
  }
  forgetform= new FormGroup({
    'to_email': new FormControl('')
  })

  @ViewChild('closemodal') closemodal: any;
send(){
  this.api.recover(this.forgetform.get('to_email')?.value).subscribe((res)=>{
  this.forgetdetails = res;
  if(res.message == "ok"){
    emailjs.init("_4YUENNcih-EHOSxm");
    emailjs.send("service_zx95xem","template_33asbc2",{
      to_name: this.forgetdetails.data[0].name,
      from_name: "Seppam",
      message: `Your Password is ${this.forgetdetails.data[0].password}`,
      to_email: this.forgetdetails.data[0].email
      });
      alert(`Your password has been send to your registered email`)
      this.forgetform.reset();
      this.closemodal.nativeElement.click();
  }
  else{
    alert("Your mail is not registered..... please register..!!!");
  }
  })


  }

}

export interface PeriodicElement {
  contact_name: string;
  contact_phone: number;
  contact_email: string;
}

export interface JQuery<TElement = HTMLElement> {
  modal(options?: any): JQuery<TElement>;
}


