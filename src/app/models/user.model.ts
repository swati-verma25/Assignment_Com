import {AddressDetails} from './address-details.model';

export class UserModel{
    id:number | undefined;
    username:string | undefined;
    name:string | undefined;
    email:string | undefined;
    address:AddressDetails| undefined;
    website:string | undefined;
    constructor(){       
    }
}