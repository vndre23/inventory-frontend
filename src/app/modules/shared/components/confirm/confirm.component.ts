import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

  private categoryService = inject(CategoryService);

  private dialogRef = inject(MatDialogRef<ConfirmComponent>);
  public data = inject(MAT_DIALOG_DATA);
  onNoClick(){
    this.dialogRef.close();
  }

  delete() {
    if(this.data!=null){
      this.categoryService.deleteCategory(this.data.id)
        .subscribe(data=>{
          this.dialogRef.close(1);
        },error=>{
          this.dialogRef.close(2);
        })
    }

  }
}
