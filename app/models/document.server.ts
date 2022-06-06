import { DocumentTypeEnum } from "./type";
import type { DocumentType } from "./type";

// Fake database :/
const documents = [
  {
    id: "aaaa1",
    type: DocumentTypeEnum.SIMPLE,
    title: "Post 1",
    date: "01-01-2020",
  },
  {
    id: "aaaa2",
    type: DocumentTypeEnum.ADVANCED,
    title: "Post 2",
    date: "05-02-2020",
  },
  {
    id: "aaaa3",
    type: DocumentTypeEnum.ADVANCED,
    title: "Post 3",
    date: "11-05-2020",
  },
];

export async function getDocuments(
  filter?: DocumentTypeEnum
): Promise<DocumentType[]> {
  return documents.filter((document) => !filter || document.type === filter);
}
