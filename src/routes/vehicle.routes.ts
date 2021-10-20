import { internal, preconditionFailed } from '@hapi/boom';
import { getRepository } from 'typeorm';
import { Document } from '../entity/Document';
import { User } from '../entity/User';
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
        const vehicles = await getRepository(Vehicle).find({ relations: ['user', 'documents']});
        
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
        
        const documents = await getRepository(Document).findByIds(data.documents);
        const user = await getRepository(User).findOneOrFail({ where: { id: data.user } });
        
        const vehicle = await getRepository(Vehicle).save({ ...data, documents, user });
        
        return vehicle;
      } catch (error) {
        return preconditionFailed(error);
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
        const vehicle = await getRepository(Vehicle).findOneOrFail(id, { relations: ['user', 'documents']});
        
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
        
        const vehicle = await getRepository(Vehicle).findOneOrFail(id);
        
        if (data.documents) {
          const actualDocuments = await getRepository(Vehicle)
          .createQueryBuilder()
          .relation(Vehicle, 'documents')
          .of(vehicle).loadMany();
          
          await getRepository(Vehicle)
          .createQueryBuilder()
          .relation(Vehicle, 'documents')
          .of(vehicle)
          .addAndRemove(data.documents, actualDocuments);
          
          delete data.documents;
        }
        
        const upd = await getRepository(Vehicle).update(id, data)
        
        return upd;
        
      } catch (error) {
        return preconditionFailed(error);
      }
    }
  },
  {
    path: '/vehicle/{id}',
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