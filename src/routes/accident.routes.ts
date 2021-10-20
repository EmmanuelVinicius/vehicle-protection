import { internal, notFound } from '@hapi/boom';
import { getRepository } from 'typeorm';
import { Accident } from '../entity/Accident';
import { User } from '../entity/User';
import { Vehicle } from '../entity/Vehicle';

const accidentRoutes = [
  {
    path: '/accident',
    method: 'GET',
    config: {
      cors: true,
      description: 'List of all accidents',
    },
    handler: async (request, headers) => {
      try {
        const accidents = await getRepository(Accident).find({ relations: ['users', 'vehicles']});
        
        return accidents;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/accident',
    method: 'POST',
    config: {
      cors: true,
      description: 'Create an accident',
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;
        
        const users = await getRepository(User).findByIds(data.users)
        .then(res => {
          if (res.length < 1) return notFound("user not found");
          
          return res;
        });
        const vehicles = await getRepository(Vehicle).findByIds(data.vehicles)
        .then(res => {
          if (res.length < 1) return notFound("vehicle not found");
          
          return res;
        });
        
        const accident = await getRepository(Accident).save({ ...data, users, vehicles});
        
        return accident;
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/accident/{id}',
    method: 'GET',
    config: {
      cors: true,
      description: 'Get only one accident',
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const accident = await getRepository(Accident).findOne(id, { relations: ['users', 'vehicles']})
        .then(res => {
          if (typeof res == 'undefined') return notFound("accident not found");
          
          return res;
        });
        
        return accident;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/accident/{id}',
    method: 'PATCH',
    config: {
      cors: true,
      description: 'Update an accident',
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const data = request.payload;
        
        const accident = await getRepository(Accident).findOneOrFail(id);
        
        if (data.users) {
          const actualUsers = await getRepository(Accident)
          .createQueryBuilder()
          .relation(Accident, 'users')
          .of(accident).loadMany();
          
          await getRepository(Accident)
          .createQueryBuilder()
          .relation(Accident, 'users')
          .of(accident)
          .addAndRemove(data.users, actualUsers);
          
          delete data.users;
        }
        
        if (data.vehicles) {
          const actualVehicles = await getRepository(Accident)
          .createQueryBuilder()
          .relation(Accident, 'vehicles')
          .of(accident).loadMany();
          
          await getRepository(Accident)
          .createQueryBuilder()
          .relation(Accident, 'vehicles')
          .of(accident)
          .addAndRemove(data.vehicles, actualVehicles);
          
          delete data.vehicles;
        }
        const upd = await getRepository(Accident).update(id, data)
        
        return upd;
        
      } catch (error) {
        return internal(error);
      }
    }
  }
];

export default accidentRoutes;