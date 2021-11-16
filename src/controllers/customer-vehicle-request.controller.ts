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
  Customer,
  VehicleRequest,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerVehicleRequestController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Array of Customer has many VehicleRequest',
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
    return this.customerRepository.vehicleRequests(id).find(filter);
  }

  @post('/customers/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(VehicleRequest)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleRequest, {
            title: 'NewVehicleRequestInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) vehicleRequest: Omit<VehicleRequest, 'id'>,
  ): Promise<VehicleRequest> {
    return this.customerRepository.vehicleRequests(id).create(vehicleRequest);
  }

  @patch('/customers/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Customer.VehicleRequest PATCH success count',
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
    return this.customerRepository.vehicleRequests(id).patch(vehicleRequest, where);
  }

  @del('/customers/{id}/vehicle-requests', {
    responses: {
      '200': {
        description: 'Customer.VehicleRequest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VehicleRequest)) where?: Where<VehicleRequest>,
  ): Promise<Count> {
    return this.customerRepository.vehicleRequests(id).delete(where);
  }
}
