import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  exports: [   
     MatDialogModule,
     MatSortModule    
  ]
})
export class MaterialExampleModule {}
