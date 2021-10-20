import { internal, notFound } from '@hapi/boom';
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
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;

        const user = await getRepository(User).findOneOrFail({ where: { id: data.user } });
        const account = await getRepository(Account).save({ ...data, user });

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
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const account = await getRepository(Account).findOne(id, { relations: ['user'] })
        .then(res => {
          if (typeof res == 'undefined') return notFound("account not found");

          return res;
        });

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
  }
];

export default accountRoutes;