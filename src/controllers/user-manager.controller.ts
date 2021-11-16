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
  User,
  Manager,
} from '../models';
import {UserRepository} from '../repositories';

export class UserManagerController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/manager', {
    responses: {
      '200': {
        description: 'User has one Manager',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Manager),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Manager>,
  ): Promise<Manager> {
    return this.userRepository.manager(id).get(filter);
  }

  @post('/users/{id}/manager', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manager)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manager, {
            title: 'NewManagerInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) manager: Omit<Manager, 'id'>,
  ): Promise<Manager> {
    return this.userRepository.manager(id).create(manager);
  }

  @patch('/users/{id}/manager', {
    responses: {
      '200': {
        description: 'User.Manager PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manager, {partial: true}),
        },
      },
    })
    manager: Partial<Manager>,
    @param.query.object('where', getWhereSchemaFor(Manager)) where?: Where<Manager>,
  ): Promise<Count> {
    return this.userRepository.manager(id).patch(manager, where);
  }

  @del('/users/{id}/manager', {
    responses: {
      '200': {
        description: 'User.Manager DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Manager)) where?: Where<Manager>,
  ): Promise<Count> {
    return this.userRepository.manager(id).delete(where);
  }
}
