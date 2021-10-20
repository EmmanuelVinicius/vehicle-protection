import { internal, preconditionFailed } from '@hapi/boom';
import * as Joi from '@hapi/joi';
import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { User } from '../entity/User';

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
        const accounts = await getRepository(Account).find({ relations: ['user'] });

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

        const user = await getRepository(User).findOneOrFail({ where: { id: data.user } });
        const account = await getRepository(Account).save({ ...data, user });

        return account;
      } catch (error) {
        return preconditionFailed(error);
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
        const account = await getRepository(Account).findOneOrFail({ relations: ['user'] });

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
    path: '/account/{id}',
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
        return preconditionFailed(error);
      }
    }
  },
];

export default accountRoutes;