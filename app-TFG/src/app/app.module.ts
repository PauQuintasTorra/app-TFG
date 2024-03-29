import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { FormsModule } from '@angular/forms';
import { LetsCreateComponent } from './lets-create/lets-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoxTypeDialogComponent } from './box-type-dialog/box-type-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReverseBoxTypeDialogComponent } from './reverse-box-type-dialog/reverse-box-type-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DownloadFromJsonFormatComponent } from './download-from-json-format/download-from-json-format.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageLoaderComponent,
    LetsCreateComponent,
    BoxTypeDialogComponent,
    ReverseBoxTypeDialogComponent,
    DownloadFromJsonFormatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
