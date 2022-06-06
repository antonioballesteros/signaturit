import { PrismaClient } from "@prisma/client";

import { DocumentTypeEnum } from "../app/models/type";
import { getTypeFromNewDocument } from "../app/utils";

const prisma = new PrismaClient();

// _____________

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
    const text = id % 3 >= 1 ? setFakeText() : undefined;
    const image = id % 3 === 2 ? setFakeImage(id) : undefined;

    const type = getTypeFromNewDocument(text, image);
    const document = {
      title: `Fake Document ${id}`,
      type,
      text,
      image,
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
