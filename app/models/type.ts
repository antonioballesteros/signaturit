export enum DocumentTypeEnum {
  "SIMPLE" = "SIMPLE",
  "CUSTOM" = "CUSTOM",
  "ADVANCED" = "ADVANCED",
}

export type DocumentType = {
  id: string;
  type: string;
  title: string;
  text: string | null;
  image: string | null;
};

export type NewDocumentType = {
  title: string;
  text: string | undefined;
  image: string | undefined;
};

export type GetDocumentsType = {
  total: number;
  data: DocumentType[];
};

export type NearestDocumentsType = {
  prev: string | null;
  next: string | null;
};
