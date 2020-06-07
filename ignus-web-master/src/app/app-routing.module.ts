import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './landing/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { PropertyComponent } from './pages/property/property.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';

const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'propiedades', component: CatalogueComponent},
  { path: 'nosotros', component: AboutComponent },
  { path: 'propiedad/:id', component: PropertyComponent },
  { path: 'suscribir', component: RegisterComponent },
  { path: 'promociones/:id', component: PromotionsComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes, { useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
