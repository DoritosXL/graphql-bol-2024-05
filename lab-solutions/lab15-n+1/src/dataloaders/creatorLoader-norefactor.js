import DataLoader from 'dataloader';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const creatorBatchFunction = async (keys) => {
  // 👇 part 1: single database request to get all needed users
  const creators = await prisma.users.findMany({
    where: { 
      id: { 
        in: keys 
      } 
    }
  });

  // 👇 part 2: structure expected by the data loader
  const creatorMap = {};
  creators.forEach((creator) => {
    creatorMap[creator.id] = creator;
  });

  return keys.map((key) => creatorMap[key]);
}

export default new DataLoader(creatorBatchFunction);