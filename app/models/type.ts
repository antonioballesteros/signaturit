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
  type: DocumentTypeEnum;
  title: string;
  text: string | null;
  image: string | null;
};

export type GetDocumentsType = {
  total: number;
  data: DocumentType[];
};
