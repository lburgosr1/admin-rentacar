import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor() { }

  async updateFile(file: File, type: string, id: string) {
    try {
      const url = `${baseUrl}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('file', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if(data.ok) {
        return data.fileName;
      } else {
        return false;
      }

    } catch(error) {
      return false;
    }
  }
}
