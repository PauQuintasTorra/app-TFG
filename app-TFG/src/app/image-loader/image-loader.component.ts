import { Component } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent {

  selectedImage: File = {} as File;
  isUploaded: boolean = false;

  constructor(private http: HttpClient) { }

  sendImage(event: any) {
    this.selectedImage = <File>event.target.files[0];
    this.isUploaded = true;
  }

  sendToBack() {
    console.log(this.selectedImage)
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    console.log(formData);
    this.http.post('/api/uploadImage', formData).subscribe(data => {
      console.log(data);
    })
  }
}
