import { Component, OnInit } from '@angular/core';
import { UserModel} from './models/user.model';
import { UserService } from './user.service';
import {Subscription} from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'appDemoArt';
  subscription = new Subscription();
  searchText:string='';
  userResult:Array<UserModel> =new Array<UserModel>();
  actualUser:Array<UserModel> =new Array<UserModel>();
  currentUser=new UserModel();
  constructor(private epmService:UserService,public dialog: MatDialog){
    this.userResult=new Array<UserModel>();
  }

  // life cyle of component
  ngOnInit(){
    this.getEmpData();
  }

  // get data from api
  getEmpData(){
    this.subscription.add( this.epmService.getEmpData().subscribe(x=>{     
     this.userResult=this.actualUser=x;
    }));
  }

  // filter data based on user name
  onSearchChange(data:any){
    if(data){
      this.userResult=this.actualUser.filter(x=>x.name?.includes(data));
    }else{
      this.userResult=this.actualUser;
    }
  }
  
  // delete user from list
  delete(user:any): void{
    if(user){
      const index: number = this.userResult.indexOf(user);
      if (index !== -1) {
        this.userResult.splice(index, 1);
       this.actualUser= this.userResult;
      }     
    }
  }

  // add user data
  addUser(): void{
    this.currentUser=new UserModel();
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '350px',
      data: this.currentUser,
    });

    dialogRef.afterClosed().subscribe(result => {    
    
    });
  }

  // edit user data
  openDialog(userInfoData:any): void {
    this.currentUser=userInfoData;
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '350px',
      data: this.currentUser,
    });

    dialogRef.afterClosed().subscribe(result => {     
    });
  }

  // sort data based on the property
  sortData(sort: Sort) {
    const data = this.userResult.slice();
    if (!sort.active || sort.direction === '') {
      this.userResult =this.actualUser= data;
      return;
    }

    this.userResult = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'username':
          return compare(a.username, b.username, isAsc);       
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'website':
          return compare(a.website, b.website, isAsc);
        default:
          return 0;
      }
    });
  }

// unsubscribe the subscription
  ngOnDestroy(): void {
   if(this.subscription){
     this.subscription.unsubscribe() 
   }
  }
}

function compare(a: number | string | undefined, b: number | string | undefined, isAsc: boolean) {
 if(a && b){
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
else return -1;
}
