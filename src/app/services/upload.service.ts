import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
CLOUD_NAME : string = "dta0ayckf" ;
PRESET_NAME : string = "upload" ;
FOLDER_NAME : string = "upload-img" ;

  constructor(private http: HttpClient) { }
  uploadFile(file: File) {
    
    
    const formData = new FormData();
    formData.append("upload_preset", this.PRESET_NAME);
  formData.append("folder", this.FOLDER_NAME);
  const headers = new HttpHeaders() 
  headers.append('Content-Type', 'multipart/form-data');
    formData.append('file', file);
    return this.http.post<any>(`https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`, formData, { 
      // responseType: 'text' 
      headers: headers
    });
  }
}
