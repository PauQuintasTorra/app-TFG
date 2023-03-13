import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="getData()">Get Data</button> 
    <button (click)="cleanData()">Clean Data</button>
    <div>{{ message }}</div>
    <br><br>
    <app-image-loader> </app-image-loader>
  `,
})
export class AppComponent {
  message: string | undefined;

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get('/api/data').subscribe((data: any) => {
      this.message = data;
    });
  }

  cleanData() {
    this.message = undefined;
  }
}
