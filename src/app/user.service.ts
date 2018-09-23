import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user:Observable<any[]>;
  constructor(private db:AngularFireDatabase) {
   }

   save(user:firebase.User){    
    this.db.object('/users/'+user.uid).update({
       name:user.displayName,
       email:user.email
     });
   }

   getUser(uid:string):AngularFireObject<AppUser>{
     return this.db.object('/users/'+uid);
   }

   getUser2(uid:string):Observable<AppUser>{
    return this.db.object('/users/'+uid).valueChanges() as Observable<AppUser>;
  }

   getUserNEW(uid:string){
    return (this.db.object('/users/'+uid)).valueChanges();
  }
}
