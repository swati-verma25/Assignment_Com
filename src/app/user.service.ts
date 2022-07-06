import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  empUrl='https://jsonplaceholder.typicode.com/users';
  constructor(private httpClient:HttpClient) { }

  getEmpData():Observable<Array<UserModel>>{
  return this.httpClient.get<Array<UserModel>>(this.empUrl);
  }
}
