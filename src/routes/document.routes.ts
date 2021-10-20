import { internal, notFound } from '@hapi/boom';
import { getRepository } from 'typeorm';
import { Document } from '../entity/Document';

const documentRoutes = [
  {
    path: '/document',
    method: 'GET',
    config: {
      cors: true,
      description: 'List of all documents',
    },
    handler: async (request, headers) => {
      try {
        const documents = await getRepository(Document).find({ relations: ['user'] });
        
        return documents;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/document',
    method: 'POST',
    config: {
      cors: true,
      description: 'Create a document',
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;
        
        const document = await getRepository(Document).save({ ...data });
        
        return document;
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/document/{id}',
    method: 'GET',
    config: {
      cors: true,
      description: 'Get only one document',
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const document = await getRepository(Document).findOne(id, { relations: ['user'] })
        .then(res => {
          if (typeof res == 'undefined') return notFound("doc not found");

          return res;
        });
        
        return document;
        
      } catch (error) {
        console.log(error)
        return internal(error);
      }
    }
  },
  {
    path: '/document/{id}',
    method: 'PATCH',
    config: {
      cors: true,
      description: 'Update a document',
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const data = request.payload;
        
        const document = await getRepository(Document).update(id, data)
        
        return document;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
];

export default documentRoutes;