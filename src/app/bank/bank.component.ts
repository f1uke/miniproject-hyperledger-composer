import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BankService } from './bank.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
  providers: [BankService]
})
export class BankComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;


  balance = new FormControl("", Validators.required);

  email = new FormControl("", Validators.required);

  firstName = new FormControl("", Validators.required);

  lastName = new FormControl("", Validators.required);


  constructor(private serviceBank: BankService, fb: FormBuilder) {
    this.myForm = fb.group({


      balance: this.balance,

      email: this.email,

      firstName: this.firstName,

      lastName: this.lastName

    });
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceBank.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.acme.vehicle.auction.Member",


      "balance": this.balance.value,

      "email": this.email.value,

      "firstName": this.firstName.value,

      "lastName": this.lastName.value



    };

    this.myForm.setValue({


      "balance": null,

      "email": null,

      "firstName": null,

      "lastName": null


    });

    return this.serviceBank.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({


          "balance": null,

          "email": null,

          "firstName": null,

          "lastName": null


        });
        this.loadAll();
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.vehicle.auction.Member",


      "balance": this.balance.value,

      "firstName": this.firstName.value,

      "lastName": this.lastName.value



    };

    return this.serviceBank.updateAsset(form.get("email").value, this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.loadAll();
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }


  deleteAsset(): Promise<any> {

    return this.serviceBank.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.loadAll();
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceBank.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {


          "balance": null,

          "email": null,

          "firstName": null,

          "lastName": null



        };




        if (result.balance) {
          formObject.balance = result.balance;
        } else {
          formObject.balance = null;
        }

        if (result.email) {
          formObject.email = result.email;
        } else {
          formObject.email = null;
        }

        if (result.firstName) {
          formObject.firstName = result.firstName;
        } else {
          formObject.firstName = null;
        }

        if (result.lastName) {
          formObject.lastName = result.lastName;
        } else {
          formObject.lastName = null;
        }


        this.myForm.setValue(formObject);

      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });

  }

  resetForm(): void {
    this.myForm.setValue({


      "balance": null,

      "email": null,

      "firstName": null,

      "lastName": null



    });
  }

}
