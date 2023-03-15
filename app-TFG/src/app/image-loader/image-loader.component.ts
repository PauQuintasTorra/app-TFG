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
  public imageSrc: string = "";
  nameImage: string = "";
  isSent: boolean = false;

  constructor(private http: HttpClient) { }

  sendImage(event: any) {
    this.selectedImage = <File>event.target.files[0];
    this.isUploaded = true;
    this.nameImage = this.selectedImage.name;
  }

  sendToBack() {
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    this.http.post('/api/uploadImage', formData).subscribe((data: any) => {
      this.imageSrc = 'data:image/jpg;base64,' + data.image;
    })
    this.isSent = true;
  }

  downloadImage() {
    this.http.get('/api/downloadImageURL',{ responseType: 'blob'})
    .subscribe((response)=>{
      const blobUrl = URL.createObjectURL(response);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = this.nameImage; // Change the filename and extension as needed
      downloadLink.click();
    })
  }
}
