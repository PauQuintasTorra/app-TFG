import { Component } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent {

  constructor(private http: HttpClient) { }

  public selectedImage: File = {} as File;

  public imageSrc: string = "";
  public nameImage: string = "";
  public selectedFormat: string = 'jpg';
  public nameSettedImage: string = "";

  public isSent: boolean = false;
  public isFormatChange: boolean = false;
  public isUploaded: boolean = false;

  // imprimir(){
  //   console.log(this.selectedFormat);
  // }

  selectImage(event: any) {
    this.selectedImage = <File>event.target.files[0];
    this.isUploaded = true;
    this.nameImage = this.selectedImage.name.split('.')[0];
  }

  sendToBack() {
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    formData.append('formatSelected', this.selectedFormat);

    this.http.post('/api/uploadImage', formData).subscribe((data: any) => {
      this.imageSrc = `data:image/${this.selectedFormat};base64,` + data.image;
    })
    console.log(this.selectedFormat);
    this.isSent = true;
    this.isFormatChange = true;
  }

  downloadImage() {
    this.http.get('/api/downloadImageURL',{ responseType: 'blob'})
    .subscribe((response)=>{
      const blobUrl = URL.createObjectURL(response);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      if (this.nameSettedImage === "") {
        downloadLink.download = `${this.nameImage}.${this.selectedFormat}`;
      } else {
        downloadLink.download = `${this.nameSettedImage}.${this.selectedFormat}`;
      }
      downloadLink.click();
    })
  }

  // downloadImage() {
  //   const format = this.selectedFormat;
  //   this.http.post('/api/downloadImageURL', {format})
  //   .subscribe((response: any)=>{
  //     console.log(format);
  //     const blob = new Blob([response], { type: `image/${format}` });
  //     const blobUrl = URL.createObjectURL(blob);
  //     const downloadLink = document.createElement('a');
  //     downloadLink.href = blobUrl;
  //     if (this.nameSettedImage === "") {
  //       downloadLink.download = `${this.nameImage}.${this.selectedFormat}`;
  //     } else {
  //       downloadLink.download = `${this.nameSettedImage}.${this.selectedFormat}`;
  //     }
  //     downloadLink.click();
  //   })
  // }
}
