import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public name;
  public pass;
  public allAssets;
  public afterLogin: any;

  fetching: boolean = false;

  constructor(private serviceLogin: LoginService, private router: Router) { }

  ngOnInit() {
    if (!this.name && !this.pass) {
      this.loadAll();
    }
  }

  submitLogin() {
    //find user from object
    console.log(this.allAssets);
    if (this.allAssets.find(emoji => emoji.email === this.name) && this.pass == "test") {

      this.afterLogin = this.name;
      console.log(this.afterLogin);
    } else {
      alert("Wrong..");
      this.router.navigate(['/Member'])
    }
    // return this.name;
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLogin.getAll()
      .toPromise()
      .then((result) => {
        // this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
        // alert("Yea1");
        console.log("rdy");
        this.fetching = true;
      })
      .catch((error) => {
        if (error == 'Server error') {
          alert("ERROR")
        }
      });
  }

}
