import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CreateRecipeComponent } from './pages/create-recipe/create-recipe.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'recipe',
        children: [
            {
                path: 'new',
                component: CreateRecipeComponent
            },
            {
                path: ':id',
                component: RecipePageComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
