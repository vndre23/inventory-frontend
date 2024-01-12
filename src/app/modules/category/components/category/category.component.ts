import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { CategoryService } from '../../../shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  // constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCategories();
  }

  displayColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe( (data:any)=>{
        console.log(data);
        this.processCategoriesResponse(data);
      }, (error)=>{
        console.error(error);
      })
  }
  processCategoriesResponse(resp:any) {
    const dataCategory: CategoryElement[] =[];
    if(resp.metadata[0].code =='00'){
      let listCategory:[] = resp.categoryResponse.categories;

      listCategory.forEach((element:CategoryElement) => {
          dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width:'450px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.openSnackBar("Categoría agregada", "Exitosa");
        this.getCategories();
      }else if(result===2){
        this.openSnackBar("Se produjo un error", "Error");
      }
    });
  }

  openSnackBar(message:string, action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }
  edit(id:number, name:string,description:string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      data: {id,name,description},
      width:'450px',
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.openSnackBar("Categoría Editada", "Exitosa");
        this.getCategories();
      }else if(result===2){
        this.openSnackBar("Se produjo un error", "Error");
      }
    });
  }

  delete(id:number){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {id},

    })
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.openSnackBar("Categoría Eliminada", "Exitosa");
        this.getCategories();
      }else if(result===2){
        this.openSnackBar("Se produjo un error", "Error");
      }
    });
  }
}


export interface CategoryElement {

  description: string;
  id: number;
  name: string;
}
