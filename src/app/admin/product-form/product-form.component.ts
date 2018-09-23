import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Category } from '../../models/Category';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$;
product:Product;
id;
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private categoryService:CategoryService, 
    private prodcutService:ProductService) 
  { 
    this.categories$=categoryService.getCategories();
    this.id=this.route.snapshot.paramMap.get('id');
    prodcutService.getProduct(this.id).subscribe(item=>{this.product=item});
  }

  save(product){
    if(this.id) this.prodcutService.updateProduct(product,this.id);
    else this.prodcutService.saveProduct(product);

    this.router.navigate(['/admin/products']);
  }

  deleteProduct(){
    if(confirm('Are you sure yoiu want to delete the product?')){
    this.prodcutService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
    }
  }


  ngOnInit() {
  }

}
