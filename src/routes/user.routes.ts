import { internal, preconditionFailed } from '@hapi/boom';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { Document } from '../entity/Document';
import { User } from '../entity/User';

const userRoutes = [
  {
    path: '/user',
    method: 'GET',
    config: {
      cors: true,
      description: 'List of all users',
    },
    handler: async (request, headers) => {
      try {
        const users = await getRepository(User).find({ relations: ['account', 'documents'] });

        return users;

      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/user',
    method: 'POST',
    config: {
      cors: true,
      description: 'Create an user',
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;

        const user = await getRepository(User).save(data);

        return user;
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/user/{id}',
    method: 'GET',
    config: {
      cors: true,
      description: 'Get only one user',
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const user = await getRepository(User).findOneOrFail(id, { relations: ['account', 'documents'] });

        return user;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/user/{id}',
    method: 'PATCH',
    config: {
      cors: true,
      description: 'Update an user',
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const data = request.payload;

        const user = await getRepository(User).findOneOrFail(id);

        if (data.documents) {
          const actualDocuments = await getRepository(User)
          .createQueryBuilder()
          .relation(User, 'documents')
          .of(user).loadMany();
          
          await getRepository(User)
          .createQueryBuilder()
          .relation(User, 'documents')
          .of(user)
          .addAndRemove(data.documents, actualDocuments);
          
          delete data.documents;
        }
        
        const upd = await getRepository(User).update(id, data)
        
        return upd;
        
      } catch (error) {
        return preconditionFailed();
      }
    }
  },
  {
    path: '/user/{id}',
    method: 'DELETE',
    config: {
      cors: true,
      description: 'Remove an user',
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const user = await getRepository(User).delete(id);
        
        return user;
        
      } catch (error) {
        return preconditionFailed(error);
      }
    }
  },
];

export default userRoutes;