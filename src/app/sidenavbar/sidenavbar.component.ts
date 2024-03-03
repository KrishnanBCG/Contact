import { Component,ElementRef,EventEmitter,HostListener,OnInit, Output} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { AppRoutingModule } from '../app-routing.module';




@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

@Output() sideNavToggled = new EventEmitter<boolean>()
menu :boolean =false;
foldername:any;
rtag:any;
inActiveContact: any;
inActive:any;
active_con:any;


  constructor(private api:ApiserviceService, 
              private elementRef: ElementRef, 
              private router:AppRoutingModule) {
  }

  ngOnInit(): void {
    this.folderName();
    this.relationtagName();
   }


SideNavToggled(){
  this.menu = !this.menu
  this.sideNavToggled.emit(this.menu);
  this.folderName();
  this.relationtagName();
  this.Inactive();
  this.ActiveCont();
}

@HostListener('document:click', ['$event'])
onClick(event: Event) {
  if (!this.elementRef.nativeElement.contains(event.target)) {
    this.menu = false; 
    this.sideNavToggled.emit(this.menu);
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
Inactive(){
  this.api.Inactivecontact().subscribe((res)=>{
    this.inActive = res.data
  })
}
ActiveCont(){
  this.api.Activecon().subscribe((res)=>{
    this.active_con = res.data
  });
}

logout(){
  this.router.login = true;
  this.router.mainpage = false;
}
}
