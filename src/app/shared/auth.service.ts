import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { BehaviorSubject, Observable, catchError, from, tap } from 'rxjs';

interface UserAuthData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);

  private userEmail: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public get userEmail$(): Observable<string | null> {
    return this.userEmail.asObservable();
  }

  public get loggenInStatus$(): Observable<boolean | null> {
    return this.loggedInStatus.asObservable();
  }
  private googleAuthProvider = new GoogleAuthProvider();

  constructor(private auth: Auth, private router: Router) {}

  registration(regData: UserAuthData): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, regData.email, regData.password)
    ).pipe(
      tap((userCredential) => {
        console.log(userCredential);
        this.loggedInStatus.next(true);
        console.log('Succesfull registrated and logged in');
        this.router.navigate(['recipes']);
      }),
      catchError((error) => {
        console.log(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }

  login(loginData: UserAuthData): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
    ).pipe(
      tap((userCredential) => {
        console.log(userCredential);
        this.loggedInStatus.next(true);
        console.log('Succesfully logged in!');
        this.router.navigate(['recipes']);
      }),
      catchError((error) => {
        console.log(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.loggedInStatus.next(false);
    this.userEmail.next(null);
  }

  checkAuthState(): void {
    this.auth.onAuthStateChanged({
      next: (user) => {
        if (user) {
          console.log('van user initkor', user);
          this.loggedInStatus.next(true);
          this.userEmail.next;
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  async loginWithGoogle(): Promise<void> {
    const user = await signInWithPopup(this.auth, this.googleAuthProvider);
    console.log('You logged in successfully');
    console.log(user);
    this.router.navigate(['recipes']);
  }
}
