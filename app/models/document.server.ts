import type { DocumentTypeEnum, NearestDocumentsType } from "./type";
import type { GetDocumentsType, DocumentType, NewDocumentType } from "./type";
import { getTypeFromNewDocument } from "~/utils";

import { prisma } from "~/db.server";

export async function getDocuments(
  filter?: DocumentTypeEnum,
  page?: number,
  length?: number
): Promise<GetDocumentsType> {
  if (!page || page < 1) {
    page = 1;
  }
  if (!length || length < 1) {
    length = 10;
  }
  const skip = (page - 1) * length;

  const where = filter
    ? {
        type: {
          equals: filter,
        },
      }
    : {};

  const documents = await prisma.document.findMany({
    where,
    orderBy: {
      id: "desc",
    },
    skip,
    take: length,
  });

  const total = await prisma.document.count();

  return {
    total,
    data: documents,
  };
}

export async function getDocument(id: string): Promise<DocumentType | null> {
  return prisma.document.findUnique({ where: { id } });
}

export async function getNearestDocuments(
  id: string
): Promise<NearestDocumentsType> {
  const result: NearestDocumentsType[] = await prisma.$queryRaw`
  select prev, next
  from (
      select id, 
              lag(id) over (order by id) as prev,
              lead(id) over (order by id) as next
      from Document
  ) as t
  where id = ${id}
  ;`;

  return result[0];
}

export async function deleteDocument(id: string): Promise<boolean> {
  const { count } = await prisma.document.deleteMany({
    where: {
      id: {
        equals: id,
      },
    },
  });
  return !!count;
}

export async function createDocument({
  title,
  text,
  image,
}: NewDocumentType): Promise<DocumentType> {
  const type = getTypeFromNewDocument(text, image);

  const newDocument = {
    type,
    title,
    text,
    image,
  };

  const created = await prisma.document.create({ data: newDocument });

  return created as DocumentType;
}
