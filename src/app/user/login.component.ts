import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user';
import * as UsersActions from './state/user.actions';
import { Store } from '@ngrx/store';
import { State, getCurrentUser } from './state/user.reducer';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private fb: FormBuilder,
                private router: Router,
                private store: Store<State>) {}

    loginForm: FormGroup;
    pageTitle = "Login";
    user = {
        userName: "",
        email: ""
    };

    ngOnInit(): void {
        // this.store.select(getCurrentUser).subscribe(
        //     currentUser => this.user = currentUser
        // );

        this.loginForm = this.fb.group({
            userName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]]
        })
    }

    login()
    {
        this.user.userName = JSON.parse(JSON.stringify(this.loginForm.get('userName').value));
        this.user.email = JSON.parse(JSON.stringify(this.loginForm.get('email').value)); 
        let user: User = this.user;
        this.store.dispatch(UsersActions.setCurrentUser( {user} ));
        this.router.navigate(['/album/albumlist']);
    }
}