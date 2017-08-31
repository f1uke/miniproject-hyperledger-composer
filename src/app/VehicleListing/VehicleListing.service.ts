import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { VehicleListing } from '../org.acme.vehicle.auction';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class VehicleListingService {

	
		private NAMESPACE: string = 'VehicleListing';
	



    constructor(private dataService: DataService<VehicleListing>) {
    };

    public getAll(): Observable<VehicleListing[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<VehicleListing> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<VehicleListing> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<VehicleListing> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<VehicleListing> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
