import { internal } from '@hapi/boom';
import * as Joi from '@hapi/joi';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';

const accountRoutes = [
  {
    path: '/account',
    method: 'GET',
    config: {
      cors: true,
      description: 'List of all accounts',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const accounts = await getRepository(Account).find();

        return accounts;

      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/account',
    method: 'POST',
    config: {
      cors: true,
      description: 'Create an account',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;
        const account = await getRepository(Account).save(data);

        return account;
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/account/{id}',
    method: 'GET',
    config: {
      cors: true,
      description: 'Get only one account',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const account = await getRepository(Account).find(id);

        return account;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/account/{id}',
    method: 'PATCH',
    config: {
      cors: true,
      description: 'Update an account',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const data = request.payload;
        
        const account = await getRepository(Account).update(id, data)
        
        return account;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/account',
    method: 'DELETE',
    config: {
      cors: true,
      description: 'Remove an account',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const account = await getRepository(Account).delete(id);
        
        return account;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
];

export default accountRoutes;