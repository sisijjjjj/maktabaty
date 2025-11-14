import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ← déjà ajouté

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConseilsMorphologieComponent } from './conseils-morphologie/conseils-morphologie.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartableComponent } from './cartable/cartable.component';
import { AboutComponent } from './about/about.component'; // ← ajouter cette ligne

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConseilsMorphologieComponent,
    PromotionsComponent,
    CategoriesComponent,
    CartableComponent,
    AboutComponent // ← ajouter cette ligne
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // ← déjà ajouté
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }