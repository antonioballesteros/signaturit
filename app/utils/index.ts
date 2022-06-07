import { DocumentTypeEnum } from "../models/type";

export const showType = (type: DocumentTypeEnum): string => {
  if (!type) {
    return type;
  }
  return type.charAt(0) + type.slice(1).toLowerCase();
};

export const showDate = (date: string): string => {
  return date.slice(0, 10);
};

export const getTypeFromNewDocument = (
  text: string | undefined,
  image: string | undefined
): DocumentTypeEnum => {
  if (image) {
    return DocumentTypeEnum.ADVANCED;
  } else if (text) {
    return DocumentTypeEnum.CUSTOM;
  }

  return DocumentTypeEnum.SIMPLE;
};
