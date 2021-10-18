import { internal, preconditionFailed } from '@hapi/boom';
import * as Joi from '@hapi/joi';
import { getRepository } from 'typeorm';
import { Accident } from '../entity/Accident';

const accidentRoutes = [
  {
    path: '/accident',
    method: 'GET',
    config: {
      cors: true,
      description: 'List of all accidents',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const accidents = await getRepository(Accident).find({ relations: ['document', 'user', 'vehicle']});

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
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const data = request.payload;
        // const vehicle = 
        // if (!data.vehicle)
        //   return preconditionFailed();
          
        const accident = await getRepository(Accident).save(data);

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
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const accident = await getRepository(Accident).find(id);

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
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const data = request.payload;
        
        const accident = await getRepository(Accident).update(id, data)
        
        return accident;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
  {
    path: '/accident',
    method: 'DELETE',
    config: {
      cors: true,
      description: 'Remove an accident',
      validate: {
        failAction: () => internal(),
      }
    },
    handler: async (request, headers) => {
      try {
        const id = request.params.id;
        const accident = await getRepository(Accident).delete(id);
        
        return accident;
        
      } catch (error) {
        return internal(error);
      }
    }
  },
];

export default accidentRoutes;