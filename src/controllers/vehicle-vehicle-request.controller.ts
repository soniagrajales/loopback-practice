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
  Vehicle,
  VehicleRequest,
} from '../models';
import {VehicleRepository} from '../repositories';

export class VehicleVehicleRequestController {
  constructor(
    @repository(VehicleRepository) protected vehicleRepository: VehicleRepository,
  ) { }

  @get('/vehicles/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Array of Vehicle has many VehicleRequest',
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
    return this.vehicleRepository.vehicleRequests(id).find(filter);
  }

  @post('/vehicles/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Vehicle model instance',
        content: {'application/json': {schema: getModelSchemaRef(VehicleRequest)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehicle.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleRequest, {
            title: 'NewVehicleRequestInVehicle',
            exclude: ['id'],
            optional: ['vehicleId']
          }),
        },
      },
    }) vehicleRequest: Omit<VehicleRequest, 'id'>,
  ): Promise<VehicleRequest> {
    return this.vehicleRepository.vehicleRequests(id).create(vehicleRequest);
  }

  @patch('/vehicles/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Vehicle.VehicleRequest PATCH success count',
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
    return this.vehicleRepository.vehicleRequests(id).patch(vehicleRequest, where);
  }

  @del('/vehicles/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Vehicle.VehicleRequest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VehicleRequest)) where?: Where<VehicleRequest>,
  ): Promise<Count> {
    return this.vehicleRepository.vehicleRequests(id).delete(where);
  }
}
