import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {  AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$:Observable<firebase.User>;
  constructor(private userService:UserService, private angfAuth:AngularFireAuth, private route:ActivatedRoute, private router:Router) { 
    this.user$=angfAuth.authState;
  }
  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.angfAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.angfAuth.auth.signOut();
  }

  authStatus(){
    if(this.user$) return true;
  }

  get appUser$():Observable<AppUser>{
    return this.user$
    .switchMap(user=>
      {
        if(user) return this.userService.getUser2(user.uid);
        
        return Observable.of(null);
      });
  }

}
