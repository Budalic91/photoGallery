import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';

const userRoutes: Routes = [
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(userRoutes),
        StoreModule.forFeature('users', userReducer)
    ],
    declarations: [
        LoginComponent
    ]
})
export class UserModule { }