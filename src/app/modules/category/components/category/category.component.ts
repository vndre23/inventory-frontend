import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  private categoryService = inject(CategoryService);

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
}

export interface CategoryElement {

  description: string;
  id: number;
  name: string;
}
