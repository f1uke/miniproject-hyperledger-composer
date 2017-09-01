import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VehicleListingService } from './VehicleListing.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-VehicleListing',
  templateUrl: './VehicleListing.component.html',
  styleUrls: ['./VehicleListing.component.css'],
  providers: [VehicleListingService]
})
export class VehicleListingComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;


  listingId = new FormControl("", Validators.required);

  reservePrice = new FormControl("", Validators.required);

  description = new FormControl("", Validators.required);

  state = new FormControl("", Validators.required);

  offers = new FormControl("", Validators.required);

  vehicle = new FormControl("", Validators.required);




  constructor(private serviceVehicleListing: VehicleListingService, fb: FormBuilder) {
    this.myForm = fb.group({


      listingId: this.listingId,



      reservePrice: this.reservePrice,



      description: this.description,



      state: this.state,



      offers: this.offers,



      vehicle: this.vehicle


    });

  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceVehicleListing.getAll()
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
      $class: "org.acme.vehicle.auction.VehicleListing",


      "listingId": this.listingId.value,



      "reservePrice": this.reservePrice.value,



      "description": this.description.value,



      "state": this.state.value,



      "offers": this.offers.value,



      "vehicle": this.vehicle.value


    };

    this.myForm.setValue({


      "listingId": null,



      "reservePrice": null,



      "description": null,



      "state": null,



      "offers": null,



      "vehicle": null


    });

    return this.serviceVehicleListing.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({


          "listingId": null,



          "reservePrice": null,



          "description": null,



          "state": null,



          "offers": null,



          "vehicle": null


        });
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

  closeBid(id: any) {


    
        this.asset = {
          $class: "org.acme.vehicle.auction.CloseBidding",
    
    
          "listing": id
    
    
        };
        console.log(id);
    
        return this.serviceVehicleListing.closeBidding(this.asset)
          .toPromise()
          .then(() => {
            this.errorMessage = null;
            console.log("Yea");
            
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
      $class: "org.acme.vehicle.auction.VehicleListing",







      "reservePrice": this.reservePrice.value,





      "description": this.description.value,





      "state": this.state.value,





      "offers": this.offers.value,





      "vehicle": this.vehicle.value



    };

    return this.serviceVehicleListing.updateAsset(form.get("listingId").value, this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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

    return this.serviceVehicleListing.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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

    return this.serviceVehicleListing.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {


          "listingId": null,



          "reservePrice": null,



          "description": null,



          "state": null,



          "offers": null,



          "vehicle": null


        };




        if (result.listingId) {
          formObject.listingId = result.listingId;
        } else {
          formObject.listingId = null;
        }

        if (result.reservePrice) {
          formObject.reservePrice = result.reservePrice;
        } else {
          formObject.reservePrice = null;
        }

        if (result.description) {
          formObject.description = result.description;
        } else {
          formObject.description = null;
        }

        if (result.state) {
          formObject.state = result.state;
        } else {
          formObject.state = null;
        }

        if (result.offers) {
          formObject.offers = result.offers;
        } else {
          formObject.offers = null;
        }

        if (result.vehicle) {
          formObject.vehicle = result.vehicle;
        } else {
          formObject.vehicle = null;
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


      "listingId": null,



      "reservePrice": null,



      "description": null,



      "state": null,



      "offers": null,



      "vehicle": null


    });
  }

}
