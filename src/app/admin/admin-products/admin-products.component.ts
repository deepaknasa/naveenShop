import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product';
// import {DataTableResource} from 'angular-6-datatable';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
products:Product[];
filteredProducts:Product[];
// tableResource:DataTableResource<Product>;
mfData:any[];
  constructor(private productService:ProductService) { 
    this.productService.getAllProduct()
    .subscribe(list=>{
      this.filteredProducts=this.products=list;

      this.mfData=list;
      // this.tableResource=new DataTableResource(list);
    })

  }
  ngOnInit() {
  }

  filter(searchText:string){
    this.filteredProducts=(searchText)?
    this.products.filter(q=>q.title.toLowerCase().includes(searchText.toLowerCase())):
    this.products;
    // console.log(searchText);
  }

}
