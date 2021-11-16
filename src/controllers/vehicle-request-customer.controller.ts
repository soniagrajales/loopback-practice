import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VehicleRequest,
  Customer,
} from '../models';
import {VehicleRequestRepository} from '../repositories';

export class VehicleRequestCustomerController {
  constructor(
    @repository(VehicleRequestRepository)
    public vehicleRequestRepository: VehicleRequestRepository,
  ) { }

  @get('/vehicle-requests/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to VehicleRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.string('id') id: typeof VehicleRequest.prototype.id,
  ): Promise<Customer> {
    return this.vehicleRequestRepository.customer(id);
  }
}
