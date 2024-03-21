import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document } from '../models/document.model';
import { DOCUMENT_URL } from '../constant/api-url.constant';
import { IAllDocumentsResponse, IDocumentsResponse } from '../interfaces/document.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  document!: Document;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getDocuments(params: string): Observable<IDocumentsResponse> {
    const url = `${baseUrl}/${DOCUMENT_URL.getDocuments}?${params}`;
    return this.http.get<IDocumentsResponse>(url, this.headers)
      .pipe(
        map(resp => resp)
      );
  }

  getAllDocuments(): Observable<Array<Document>> {
    const url = `${baseUrl}/${DOCUMENT_URL.geAlltDocuments}`;
    return this.http.get<IAllDocumentsResponse>(url, this.headers)
      .pipe(
        map(resp => resp.documents)
      );
  }

  getDocument(documentId: string): Observable<Document> {
    const url = `${baseUrl}/${DOCUMENT_URL.getDocument}/${documentId}`;
    return this.http.get<Document>(url, this.headers);
  }

  createDocument(data: Document): Observable<Document> {
    const url = `${baseUrl}/${DOCUMENT_URL.createDocument}`;
    return this.http.post<Document>(url, data, this.headers);
  }

  updateDocument(data: Document, documentId: string): Observable<Document> {
    const url = `${baseUrl}/${DOCUMENT_URL.updateDocument}/${documentId}`;
    return this.http.put<Document>(url, data, this.headers);
  }

  updateDocumentContact(data: Document): Observable<Document> {
    const url = `${baseUrl}/${DOCUMENT_URL.updateDocument}/${data.document_id}`;
    return this.http.put<Document>(url, data, this.headers);
  }

  deleteDocument(id: string) {
    const url = `${baseUrl}/${DOCUMENT_URL.deleteDocument}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
