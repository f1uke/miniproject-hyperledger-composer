import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { Vehicle } from '../../org.acme.vehicle.auction';
import 'rxjs/Rx';

@Injectable()
export class ContentService {

  private NAMESPACE: string = 'queries/selectVehicleListingForSale';
  private NAMESPACE2: string = 'Offer';
  private NAMESPACE3: string = 'queries/selectVehicleByOwner';

  constructor(private dataService: DataService<Vehicle>) { }

  public getAll(): Observable<Vehicle[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public addAsset(itemToAdd: any): Observable<Vehicle> {
    return this.dataService.add(this.NAMESPACE2, itemToAdd);
  }

  public getMyCar(name: any): Observable<Vehicle> {
    return this.dataService.getSingle(this.NAMESPACE, "org.acme.vehicle.auction.Member#"+name);
  }

}
