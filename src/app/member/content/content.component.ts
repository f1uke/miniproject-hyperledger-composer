import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ContentService]
})
export class ContentComponent implements OnInit {

  myForm: FormGroup;

  name: string;
  private sub: any;

  private errorMessage;
  private allAssets;
  private allMyCar;
  private asset;

  private listing: any;

  vin = new FormControl("", Validators.required);
  owner = new FormControl("", Validators.required);
  bidPrice = new FormControl("", Validators.required);


  constructor(private serviceVehicle: ContentService, private route: ActivatedRoute, fb: FormBuilder) {
    this.myForm = fb.group({


      vin: this.vin,

      owner: this.owner,

      bidPrice: this.bidPrice


    });
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
    });

    this.loadAll();
    // this.getMycar();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceVehicle.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
        console.log(this.allAssets);
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

  getID(id: any){
    this.listing = id;
    console.log(this.listing);
  }

  addAsset(form: any): Promise<any> {
    
        this.asset = {
          $class: "org.acme.vehicle.auction.Offer",
    
    
          "bidPrice": this.bidPrice.value,
    
          "listing": this.listing,
    
          "member": this.name
    
    
    
        };
    
        this.myForm.setValue({
    
    
          "vin": null,
    
          "owner": null,
    
          "bidPrice": null
    
    
        });
    
        return this.serviceVehicle.addAsset(this.asset)
          .toPromise()
          .then(() => {
            this.errorMessage = null;
            this.myForm.setValue({
    
    
              "vin": null,
    
              "owner": null,
    
              "bidPrice": null
    
    
            });
          })
          .catch((error) => {
            if (error == 'Server error') {
              alert('Could not connect to REST server');
              this.errorMessage = "Could not connect to REST server. Please check your configuration details";
            }
            else {
              this.errorMessage = error;
              alert('ERROR');
            }
          });
      }

      // getMycar(): Promise<any> {
      //   let tempList = [];
      //   return this.serviceVehicle.getMyCar(this.name)
      //     .toPromise()
      //     .then((result) => {
      //       this.errorMessage = null;
      //       result.forEach(asset => {
      //         tempList.push(asset);
      //       });
      //       this.allMyCar = tempList;
      //       console.log(this.allMyCar);
      //     })
      //     .catch((error) => {
      //       if (error == 'Server error') {
      //         this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      //       }
      //       else if (error == '404 - Not Found') {
      //         this.errorMessage = "404 - Could not find API route. Please check your available APIs."
      //       }
      //       else {
      //         this.errorMessage = error;
      //       }
      //     });
      // }


}
