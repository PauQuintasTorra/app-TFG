import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <!-- <button (click)="getData()">Get Data</button>
    <button (click)="cleanData()">Clean Data</button>
    <div>{{ message }}</div>
    <button (click)="changeComponent()">Canviar component</button>
    <br />
    <br /> -->
    <app-image-loader *ngIf="!isLetsCreate"> </app-image-loader>
    <app-lets-create *ngIf="isLetsCreate"> </app-lets-create>
  `,
})
export class AppComponent {
  message: string | undefined;

  isLetsCreate: boolean = true;

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get('/api/data').subscribe((data: any) => {
      this.message = data;
    });
  }

  changeComponent() {
    this.isLetsCreate = !this.isLetsCreate;
  }

  cleanData() {
    this.message = undefined;
  }
}
