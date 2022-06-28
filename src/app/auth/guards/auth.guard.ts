import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
constructor (private authService: AuthService,
            private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificaAutenticacion()
            .pipe(
              tap(estaAuntentificado=>{
                if(!estaAuntentificado){
                  this.router.navigate(['./auth/login']);
                }
              })
              )
      
      // if(this.authService.auth.id){
      //   return true;
      // }
      // console.log('bloqueado por el AuthGuard - CanAntivate');
      // return false;
  }



  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean  {
      return this.authService.verificaAutenticacion()
      .pipe(
        tap(estaAuntentificado=>{
          if(!estaAuntentificado){
            this.router.navigate(['./auth/login']);
          }
        })
        )
    // if(this.authService.auth.id){
    //   return true;
    // }
    // console.log('bloqueado por el AuthGuard - CanAntivate');
    // return false;
  }
}
