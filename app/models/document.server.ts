import { DocumentTypeEnum } from "./type";
import type { GetDocumentsType, DocumentType, NewDocumentType } from "./type";

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
const setFakeText = (): string => {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit. Etiam vitae velit metus. Lorem ipsum dolor sit amet, 
  consectetur adipiscing elit. Aenean diam tellus, imperdiet quis nisl id, 
  fermentum ultricies ex. Aenean placerat, dolor sollicitudin consectetur 
  bibendum, mi libero bibendum nisl, vitae malesuada metus arcu nec erat. 
  Sed eleifend quam pulvinar, hendrerit ex pharetra, commodo augue. 
  Aenean nec urna ac purus pellentesque consectetur vitae ut mi. 
  Ut lacinia lectus quis velit mattis, id pharetra ex posuere. 
  Curabitur congue massa eget diam pellentesque elementum. 
  Ut dapibus ante ut ipsum faucibus rhoncus.`;
};
const setFakeImage = (id: number): string => {
  return `https://picsum.photos/id/${id}/200/300`;
};

const buildFakeDocuments = (): DocumentType[] => {
  return [...Array(250).keys()].map((id) => {
    const type = setFakeType(id);
    const document: DocumentType = {
      id: `${id}`,
      type,
      title: `Document ${id}`,
      date: "2022-01-26T11:11:41.124Z",
      text: type !== DocumentTypeEnum.SIMPLE ? setFakeText() : undefined,
      image: type === DocumentTypeEnum.ADVANCED ? setFakeImage(id) : undefined,
    };
    return document;
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

export async function getDocument(
  id: string
): Promise<DocumentType | undefined> {
  return documents.find((document) => document.id === id);
}

export async function deleteDocument(id: string): Promise<boolean> {
  const index: number = documents.findIndex((document) => document.id === id);
  if (index === -1) {
    return false;
  }
  documents.splice(index, 1);
  return true;
}

export async function createDocument({
  type,
  title,
  text,
  image,
}: NewDocumentType): Promise<DocumentType> {
  const date = new Date().toJSON();

  const nextId = documents.reduce((prev: number, document: DocumentType) => {
    return Math.max(prev, parseInt(document.id));
  }, 0);

  const newDocument: DocumentType = {
    id: `${nextId + 1}`,
    type,
    title,
    date,
    text,
    image,
  };
  documents.push(newDocument);

  return newDocument;
}
