import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VehicleRequest, VehicleRequestRelations, Customer, Manager, Vehicle} from '../models';
import {CustomerRepository} from './customer.repository';
import {ManagerRepository} from './manager.repository';
import {VehicleRepository} from './vehicle.repository';

export class VehicleRequestRepository extends DefaultCrudRepository<
  VehicleRequest,
  typeof VehicleRequest.prototype.id,
  VehicleRequestRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof VehicleRequest.prototype.id>;

  public readonly manager: BelongsToAccessor<Manager, typeof VehicleRequest.prototype.id>;

  public readonly vehicle: BelongsToAccessor<Vehicle, typeof VehicleRequest.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('ManagerRepository') protected managerRepositoryGetter: Getter<ManagerRepository>, @repository.getter('VehicleRepository') protected vehicleRepositoryGetter: Getter<VehicleRepository>,
  ) {
    super(VehicleRequest, dataSource);
    this.vehicle = this.createBelongsToAccessorFor('vehicle', vehicleRepositoryGetter,);
    this.registerInclusionResolver('vehicle', this.vehicle.inclusionResolver);
    this.manager = this.createBelongsToAccessorFor('manager', managerRepositoryGetter,);
    this.registerInclusionResolver('manager', this.manager.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
