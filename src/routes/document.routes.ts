import { internal } from '@hapi/boom';
import * as Joi from '@hapi/joi';
import { getRepository } from 'typeorm';
import { Document } from '../entity/Document';

const documentRoutes = [
  {
    path: '/document',
    method: 'GET',
    config: {
      cors: true,
      description: 'List of all documents',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const documents = await getRepository(Document).find();

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
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;
        const document = await getRepository(Document).save(data);

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
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const document = await getRepository(Document).find(id);

        return document;
        
      } catch (error) {
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
      validate: {
        failAction: () => internal(),
      }
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
  {
    path: '/document',
    method: 'DELETE',
    config: {
      cors: true,
      description: 'Remove a document',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const document = await getRepository(Document).delete(id);
        
        return document;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
];

export default documentRoutes;