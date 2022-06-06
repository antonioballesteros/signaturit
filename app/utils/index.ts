import type { DocumentTypeEnum } from "~/models/type";

export const showType = (type: DocumentTypeEnum): string => {
  return type.charAt(0) + type.slice(1).toLowerCase();
};

export const showDate = (date: string): string => {
  return date.slice(0, 10);
};
