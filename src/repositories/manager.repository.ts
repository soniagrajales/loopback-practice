import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Manager, ManagerRelations, User, VehicleRequest} from '../models';
import {UserRepository} from './user.repository';
import {VehicleRequestRepository} from './vehicle-request.repository';

export class ManagerRepository extends DefaultCrudRepository<
  Manager,
  typeof Manager.prototype.id,
  ManagerRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Manager.prototype.id>;

  public readonly vehicleRequests: HasManyRepositoryFactory<VehicleRequest, typeof Manager.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('VehicleRequestRepository') protected vehicleRequestRepositoryGetter: Getter<VehicleRequestRepository>,
  ) {
    super(Manager, dataSource);
    this.vehicleRequests = this.createHasManyRepositoryFactoryFor('vehicleRequests', vehicleRequestRepositoryGetter,);
    this.registerInclusionResolver('vehicleRequests', this.vehicleRequests.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
