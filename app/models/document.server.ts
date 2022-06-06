import { DocumentTypeEnum } from "./type";
import type { GetDocumentsType } from "./type";

// Fake database :/
const setFakeType = (id: number): DocumentTypeEnum => {
  switch (id % 3) {
    case 1:
      return DocumentTypeEnum.CUSTOM;
    case 2:
      return DocumentTypeEnum.ADVANCED;
  }
  return DocumentTypeEnum.SIMPLE;
};

const buildFakeDocuments = () => {
  return [...Array(250).keys()].map((id) => {
    return {
      id: `aaa${id}`,
      type: setFakeType(id),
      title: `Document ${id}`,
      date: "11-05-2020",
    };
  });
};

const documents = buildFakeDocuments();

export async function getDocuments(
  filter?: DocumentTypeEnum,
  page?: number,
  length?: number
): Promise<GetDocumentsType> {
  const list = documents.filter(
    (document) => !filter || document.type === filter
  );

  if (!page || page < 1) {
    page = 1;
  }
  if (!length || length < 1) {
    length = 10;
  }
  const first = (page - 1) * length;
  const last = page * length;

  return {
    total: list.length,
    data: list.slice(first, last),
  };
}
