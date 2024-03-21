import { Document } from "../models/document.model";

export interface IDocumentsResponse {
  total: number;
  documents: Document[];
}

export interface IAllDocumentsResponse {
  ok: boolean;
  documents: Document[];
}
