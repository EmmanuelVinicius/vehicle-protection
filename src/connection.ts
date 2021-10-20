import { createConnection, getConnection } from 'typeorm';

const connection = {
  async create(){
    return await createConnection();
  },
  
  async close(){
    return await getConnection().close(); 
  },
  
  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;
    
    const entityDeletionPromises = entities.map((entity) => async() => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
    await Promise.all(entityDeletionPromises);
    return entityDeletionPromises;
  },
};
export default connection;
