import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit{


  public categoryForm!: FormGroup;

  private fb = inject(FormBuilder);

  private categoryService = inject(CategoryService);

  private dialogRef = inject(MatDialogRef);

  public data = inject(MAT_DIALOG_DATA);

  estadoForm:string = "Agregar";


  ngOnInit(): void {
    console.log(this.data);
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    if(this.data!=null){
      this.updateForm(this.data);
      this.estadoForm="Actualizar";
    }
  }
  onSave(){
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }
    if(this.data!=null){
      this.categoryService.updateCategory(this.data.id,data)
        .subscribe(dat=> {
          this.dialogRef.close(1);
        },error=>{
          this.dialogRef.close(2);
        });
    }else{
      this.categoryService.saveCategory(data)
        .subscribe(data=> {
          console.log(data);
          this.dialogRef.close(1);
        }, error=> {
          this.dialogRef.close(2);
        })
    }
  }
  onCancel(){
    this.dialogRef.close();
  }
  updateForm(data:any){
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });
  }
}
