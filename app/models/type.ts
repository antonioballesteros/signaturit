export enum DocumentTypeEnum {
  "SIMPLE" = "SIMPLE",
  "CUSTOM" = "CUSTOM",
  "ADVANCED" = "ADVANCED",
}

export type DocumentType = {
  id: string;
  type: DocumentTypeEnum;
  title: string;
  date: string;
};

export type GetDocumentsType = {
  total: number;
  data: DocumentType[];
};