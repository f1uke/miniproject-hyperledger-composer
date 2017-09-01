import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.vehicle.auction{
   export class Vehicle extends Asset {
      vin: string;
      owner: Member;
   }
   export enum ListingState {
      FOR_SALE,
      RESERVE_NOT_MET,
      SOLD,
   }
   export class VehicleListing extends Asset {
      listingId: string;
      reservePrice: number;
      description: string;
      state: ListingState;
      offers: Offer[];
      vehicle: Vehicle;
   }
   export abstract class User extends Participant {
      email: string;
      firstName: string;
      lastName: string;
      balance: number;
   }
   export class Member extends User {
      balance: number;
   }
   export class Auctioneer extends User {
   }
   export class Offer extends Transaction {
      bidPrice: number;
      listing: VehicleListing;
      member: Member;
   }
   export class CloseBidding extends Transaction {
      listing: VehicleListing;
   }
// }
