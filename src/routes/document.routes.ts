import { internal, preconditionFailed } from '@hapi/boom';
import { getRepository } from 'typeorm';
import { Document } from '../entity/Document';
import { User } from '../entity/User';

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
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;
        
        const user = await getRepository(User).findOneOrFail({ where: { id: data.user } });
        const document = await getRepository(Document).save({ ...data, user });
        
        return document;
      } catch (error) {
        return preconditionFailed(error);
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
        const document = await getRepository(Document).findOneOrFail(id);
        
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
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const data = request.payload;
        
        const document = await getRepository(Document).update(id, data)
        
        return document;
        
      } catch (error) {
        return preconditionFailed(error);
      }
    }
  },
  {
    path: '/document/{id}',
    method: 'DELETE',
    config: {
      cors: true,
      description: 'Remove a document',
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