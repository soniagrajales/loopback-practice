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
  Vehicle,
} from '../models';
import {VehicleRequestRepository} from '../repositories';

export class VehicleRequestVehicleController {
  constructor(
    @repository(VehicleRequestRepository)
    public vehicleRequestRepository: VehicleRequestRepository,
  ) { }

  @get('/vehicle-requests/{id}/vehicle', {
    responses: {
      '200': {
        description: 'Vehicle belonging to VehicleRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehicle)},
          },
        },
      },
    },
  })
  async getVehicle(
    @param.path.string('id') id: typeof VehicleRequest.prototype.id,
  ): Promise<Vehicle> {
    return this.vehicleRequestRepository.vehicle(id);
  }
}
