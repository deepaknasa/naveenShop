import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from './models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getCategories(){
    return this.db.list<Category>('/categories', ref=>ref.orderByChild('name')).valueChanges();
  }
}
