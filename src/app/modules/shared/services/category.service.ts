import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  constructor(private http: HttpClient) { }

  getCategories() {
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  saveCategory(body:any) {
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint,body);
  }

  updateCategory(id:number,body:any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint,body);
  }
}
