import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { FormsModule } from '@angular/forms';
import { LetsCreateComponent } from './lets-create/lets-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageLoaderComponent,
    LetsCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
