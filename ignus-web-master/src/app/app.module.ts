import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';

import { GlobalService } from './providers/global.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './landing/layout/layout.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ServicesComponent } from './pages/services/services.component';
import { NetworksComponent } from './shared/networks/networks.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyComponent } from './pages/property/property.component';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { FiltersComponent } from './shared/filters/filters.component';
import { SpecificationsComponent } from './pages/property/specifications/specifications.component';
import { MapComponent } from './shared/map/map.component';
import { ListPromotionsComponent } from './pages/list-promotions/list-promotions.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    FooterComponent,
    ServicesComponent,
    NetworksComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    CatalogueComponent,
    PropertiesComponent,
    PropertyComponent,
    GalleryComponent,
    FiltersComponent,
    SpecificationsComponent,
    MapComponent,
    ListPromotionsComponent,
    PromotionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD-VkHwEAk4z_Ul91iQpB0Rqv15rtGVIJU'
    })
  ],
  providers: [
    GlobalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
