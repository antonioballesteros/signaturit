import { PrismaClient } from "@prisma/client";

import { DocumentTypeEnum } from "../app/models/type";

const prisma = new PrismaClient();

// _____________

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

async function seed() {
  [...Array(250).keys()].map(async (id) => {
    const type = setFakeType(id);
    const document = {
      type,
      title: `Fake Document ${id}`,
      text: type !== DocumentTypeEnum.SIMPLE ? setFakeText() : undefined,
      image: type === DocumentTypeEnum.ADVANCED ? setFakeImage(id) : undefined,
    };

    console.log("seed document", document);

    await prisma.document.create({
      data: document,
    });
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
