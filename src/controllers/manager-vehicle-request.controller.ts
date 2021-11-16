import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Manager,
  VehicleRequest,
} from '../models';
import {ManagerRepository} from '../repositories';

export class ManagerVehicleRequestController {
  constructor(
    @repository(ManagerRepository) protected managerRepository: ManagerRepository,
  ) { }

  @get('/managers/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Array of Manager has many VehicleRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VehicleRequest)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VehicleRequest>,
  ): Promise<VehicleRequest[]> {
    return this.managerRepository.vehicleRequests(id).find(filter);
  }

  @post('/managers/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Manager model instance',
        content: {'application/json': {schema: getModelSchemaRef(VehicleRequest)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Manager.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleRequest, {
            title: 'NewVehicleRequestInManager',
            exclude: ['id'],
            optional: ['managerId']
          }),
        },
      },
    }) vehicleRequest: Omit<VehicleRequest, 'id'>,
  ): Promise<VehicleRequest> {
    return this.managerRepository.vehicleRequests(id).create(vehicleRequest);
  }

  @patch('/managers/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Manager.VehicleRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleRequest, {partial: true}),
        },
      },
    })
    vehicleRequest: Partial<VehicleRequest>,
    @param.query.object('where', getWhereSchemaFor(VehicleRequest)) where?: Where<VehicleRequest>,
  ): Promise<Count> {
    return this.managerRepository.vehicleRequests(id).patch(vehicleRequest, where);
  }

  @del('/managers/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Manager.VehicleRequest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VehicleRequest)) where?: Where<VehicleRequest>,
  ): Promise<Count> {
    return this.managerRepository.vehicleRequests(id).delete(where);
  }
}
