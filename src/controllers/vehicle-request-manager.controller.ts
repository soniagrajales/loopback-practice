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
  Manager,
} from '../models';
import {VehicleRequestRepository} from '../repositories';

export class VehicleRequestManagerController {
  constructor(
    @repository(VehicleRequestRepository)
    public vehicleRequestRepository: VehicleRequestRepository,
  ) { }

  @get('/vehicle-requests/{id}/manager', {
    responses: {
      '200': {
        description: 'Manager belonging to VehicleRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manager)},
          },
        },
      },
    },
  })
  async getManager(
    @param.path.string('id') id: typeof VehicleRequest.prototype.id,
  ): Promise<Manager> {
    return this.vehicleRequestRepository.manager(id);
  }
}
