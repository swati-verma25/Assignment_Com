import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.less']
})
export class AddEditUserComponent implements OnInit {
  userData:UserModel=new UserModel();
  buttonText:string='';

  @ViewChild('form', { static: true }) form: NgForm | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}

  ngOnInit(): void {
  this.userData=this.data;
    if(this.userData && this.userData.id &&  this.userData.id>0){
      this.buttonText='Edit User';
    }else{
      this.buttonText='Add User';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editOrAdd(){
    if(this.form?.valid){
      this.dialogRef.close();
      //can inject api to add or delete
    }else{
      alert('Please enter all required field');
    }
  }
}