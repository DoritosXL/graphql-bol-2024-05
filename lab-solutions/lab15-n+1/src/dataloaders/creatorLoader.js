import DataLoader from 'dataloader';

export default (prisma) => {
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
  return new DataLoader(creatorBatchFunction);
}