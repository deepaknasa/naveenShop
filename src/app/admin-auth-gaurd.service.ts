import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs';
import { AppUser } from './models/app-user';
import { AngularFireObject } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurd implements CanActivate {

  constructor(private auth:AuthService,private userService:UserService) { }

  canActivate():Observable<boolean>{
    // let tempVar:boolean
    return this.auth.user$
    .switchMap(user=>this.userService.getUserNEW(user.uid))
    .map(appUser=>{return (appUser as AppUser).isAdmin})
    // .subscribe(appUser=>{tempVar= ((appUser as AppUser).isAdmin)});
    // console.log(tempVar);

    // this.auth.user$
    // .subscribe(user=>{tempVar = this.userService.getUser(user.uid)});
    // // console.log(tempVar.isAdmin);
    // return tempVar;
    // .map(user=>{
    //   return this.userService.getUser(user.uid);
    // })
  }
}
