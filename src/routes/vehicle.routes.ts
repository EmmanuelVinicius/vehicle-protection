import { internal } from '@hapi/boom';
import * as Joi from '@hapi/joi';
import { getRepository } from 'typeorm';
import { Vehicle } from '../entity/Vehicle';

const vehicleRoutes = [
  {
    path: '/vehicle',
    method: 'GET',
    config: {
      cors: true,
      description: 'List of all vehicles',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const vehicles = await getRepository(Vehicle).find();

        return vehicles;

      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/vehicle',
    method: 'POST',
    config: {
      cors: true,
      description: 'Create a vehicle',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;
        const vehicle = await getRepository(Vehicle).save(data);

        return vehicle;
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/vehicle/{id}',
    method: 'GET',
    config: {
      cors: true,
      description: 'Get only one vehicle',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const vehicle = await getRepository(Vehicle).find(id);

        return vehicle;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/vehicle/{id}',
    method: 'PATCH',
    config: {
      cors: true,
      description: 'Update a vehicle',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const data = request.payload;
        
        const vehicle = await getRepository(Vehicle).update(id, data)
        
        return vehicle;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/vehicle',
    method: 'DELETE',
    config: {
      cors: true,
      description: 'Remove a vehicle',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const vehicle = await getRepository(Vehicle).delete(id);
        
        return vehicle;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
];

export default vehicleRoutes;