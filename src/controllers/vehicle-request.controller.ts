import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {VehicleRequest} from '../models';
import {VehicleRequestRepository} from '../repositories';

export class VehicleRequestController {
  constructor(
    @repository(VehicleRequestRepository)
    public vehicleRequestRepository : VehicleRequestRepository,
  ) {}

  @post('/vehicle-requests')
  @response(200, {
    description: 'VehicleRequest model instance',
    content: {'application/json': {schema: getModelSchemaRef(VehicleRequest)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleRequest, {
            title: 'NewVehicleRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    vehicleRequest: Omit<VehicleRequest, 'id'>,
  ): Promise<VehicleRequest> {
    return this.vehicleRequestRepository.create(vehicleRequest);
  }

  @get('/vehicle-requests/count')
  @response(200, {
    description: 'VehicleRequest model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VehicleRequest) where?: Where<VehicleRequest>,
  ): Promise<Count> {
    return this.vehicleRequestRepository.count(where);
  }

  @get('/vehicle-requests')
  @response(200, {
    description: 'Array of VehicleRequest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VehicleRequest, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VehicleRequest) filter?: Filter<VehicleRequest>,
  ): Promise<VehicleRequest[]> {
    return this.vehicleRequestRepository.find(filter);
  }

  @patch('/vehicle-requests')
  @response(200, {
    description: 'VehicleRequest PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleRequest, {partial: true}),
        },
      },
    })
    vehicleRequest: VehicleRequest,
    @param.where(VehicleRequest) where?: Where<VehicleRequest>,
  ): Promise<Count> {
    return this.vehicleRequestRepository.updateAll(vehicleRequest, where);
  }

  @get('/vehicle-requests/{id}')
  @response(200, {
    description: 'VehicleRequest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VehicleRequest, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VehicleRequest, {exclude: 'where'}) filter?: FilterExcludingWhere<VehicleRequest>
  ): Promise<VehicleRequest> {
    return this.vehicleRequestRepository.findById(id, filter);
  }

  @patch('/vehicle-requests/{id}')
  @response(204, {
    description: 'VehicleRequest PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleRequest, {partial: true}),
        },
      },
    })
    vehicleRequest: VehicleRequest,
  ): Promise<void> {
    await this.vehicleRequestRepository.updateById(id, vehicleRequest);
  }

  @put('/vehicle-requests/{id}')
  @response(204, {
    description: 'VehicleRequest PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vehicleRequest: VehicleRequest,
  ): Promise<void> {
    await this.vehicleRequestRepository.replaceById(id, vehicleRequest);
  }

  @del('/vehicle-requests/{id}')
  @response(204, {
    description: 'VehicleRequest DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vehicleRequestRepository.deleteById(id);
  }
}
