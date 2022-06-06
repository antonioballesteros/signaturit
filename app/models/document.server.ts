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

const buildFakeDocuments = () => {
  return [...Array(250).keys()].map((id) => {
    const type = setFakeType(id);
    return {
      id: `aaa${id}`,
      type,
      title: `Document ${id}`,
      date: "11-05-2020",
      text: type !== DocumentTypeEnum.SIMPLE ? setFakeText() : undefined,
      image: type === DocumentTypeEnum.ADVANCED ? setFakeImage(id) : undefined,
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
