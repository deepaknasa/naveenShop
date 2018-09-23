import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
user$:Observable<firebase.User>;
  constructor(private angfAuth:AngularFireAuth, private router:Router) { }

  canActivate(route, state:RouterStateSnapshot){
    return this.angfAuth.authState.map(user=>{
      if(user) return true;

      this.router.navigate(['/login'],{queryParams: {returnUrl:state.url}});
      return false;
    });
  }
}
