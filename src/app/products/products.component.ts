import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { CategoryService } from '../category.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
productList:Product[];
categoryList:Category[];
  constructor(private productService:ProductService,categoryService:CategoryService) {
    productService.getAllProduct()
    .subscribe(list=>{
      this.productList=list;
    });

    categoryService.getCategories()
    .subscribe(list=>{
      this.categoryList=list;
    });
   }

}
