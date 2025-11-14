import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartableComponent } from './cartable/cartable.component'; // ← importer
import { CategoriesComponent } from './categories/categories.component';
import { PromotionsComponent } from './promotions/promotions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cartables', component: CartableComponent }, // ← ajouter cette route
  { path: 'categories', component: CategoriesComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }