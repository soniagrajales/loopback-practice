import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Customer, Manager} from '../models';
import {CustomerRepository} from './customer.repository';
import {ManagerRepository} from './manager.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly customer: HasOneRepositoryFactory<Customer, typeof User.prototype.id>;

  public readonly manager: HasOneRepositoryFactory<Manager, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('ManagerRepository') protected managerRepositoryGetter: Getter<ManagerRepository>,
  ) {
    super(User, dataSource);
    this.manager = this.createHasOneRepositoryFactoryFor('manager', managerRepositoryGetter);
    this.registerInclusionResolver('manager', this.manager.inclusionResolver);
    this.customer = this.createHasOneRepositoryFactoryFor('customer', customerRepositoryGetter);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
