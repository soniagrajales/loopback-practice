import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehicle, VehicleRelations, VehicleRequest} from '../models';
import {VehicleRequestRepository} from './vehicle-request.repository';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.id,
  VehicleRelations
> {

  public readonly vehicleRequests: HasManyRepositoryFactory<VehicleRequest, typeof Vehicle.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehicleRequestRepository') protected vehicleRequestRepositoryGetter: Getter<VehicleRequestRepository>,
  ) {
    super(Vehicle, dataSource);
    this.vehicleRequests = this.createHasManyRepositoryFactoryFor('vehicleRequests', vehicleRequestRepositoryGetter,);
    this.registerInclusionResolver('vehicleRequests', this.vehicleRequests.inclusionResolver);
  }
}
