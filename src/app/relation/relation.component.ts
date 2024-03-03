import { Component, OnInit, Input} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {

  reltag:any;

  constructor(private api:ApiserviceService){}
  ngOnInit(): void {
    this.api.rtags().subscribe((res)=>{
      this.reltag = res.data;
    })
    this.relationtagName();
  }
  relationtagName(){
    this.api.rtags().subscribe((res) => {
      this.reltag = res.data
    })
  }

}
