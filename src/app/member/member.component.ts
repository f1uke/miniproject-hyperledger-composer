import { Component, OnInit } from '@angular/core';
import {LoginService} from './login/login.service'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  providers: [LoginService]
})
export class MemberComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
