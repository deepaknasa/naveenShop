import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  saveProduct(prodcut){
    this.db.list('/product').push(prodcut);
  }

  getAllProduct(){
    return this.db.list<Product>('/product/products')
    .snapshotChanges()
    .map(changes=>  changes.map(c=>({
      $key:c.payload.key, ...c.payload.val()
    })))
  }

  getProduct(productId){
    return this.db.object('/product/products/'+ productId)
    .snapshotChanges()
    .map(item=> ({$key:item.payload.key, ...((item).payload.val() as Product)
    }));
  }

  updateProduct(product,productId){
    return this.db.object('/product/'+productId)
    .update(product);
  }

  deleteProduct(productId){
    this.db.object('/product/' + productId)
    .remove();
  }
}
