import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  onSave(){
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }
    this.categoryService.saveCategory(data)
      .subscribe(data=> {
        console.log(data);
        this.dialogRef.close(1);
      }, error=> {
        this.dialogRef.close(2);
      })
  }
  onCancel(){
    this.dialogRef.close();
  }
}
