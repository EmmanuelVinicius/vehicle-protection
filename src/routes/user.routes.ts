import { internal } from '@hapi/boom';
import * as Joi from '@hapi/joi';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

const userRoutes = [
  {
    path: '/user',
    method: 'GET',
    config: {
      cors: true,
      description: 'List of all users',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const users = await getRepository(User).find();

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
      validate: {
        failAction: () => internal(),
      }
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
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const user = await getRepository(User).find(id);

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
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const data = request.payload;
        
        const user = await getRepository(User).update(id, data)
        
        return user;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/user',
    method: 'DELETE',
    config: {
      cors: true,
      description: 'Remove an user',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const user = await getRepository(User).delete(id);
        
        return user;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
];

export default userRoutes;