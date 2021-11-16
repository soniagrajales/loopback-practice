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
import {Manager} from '../models';
import {ManagerRepository} from '../repositories';

export class ManagerController {
  constructor(
    @repository(ManagerRepository)
    public managerRepository : ManagerRepository,
  ) {}

  @post('/managers')
  @response(200, {
    description: 'Manager model instance',
    content: {'application/json': {schema: getModelSchemaRef(Manager)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manager, {
            title: 'NewManager',
            exclude: ['id'],
          }),
        },
      },
    })
    manager: Omit<Manager, 'id'>,
  ): Promise<Manager> {
    return this.managerRepository.create(manager);
  }

  @get('/managers/count')
  @response(200, {
    description: 'Manager model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Manager) where?: Where<Manager>,
  ): Promise<Count> {
    return this.managerRepository.count(where);
  }

  @get('/managers')
  @response(200, {
    description: 'Array of Manager model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Manager, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Manager) filter?: Filter<Manager>,
  ): Promise<Manager[]> {
    return this.managerRepository.find(filter);
  }

  @patch('/managers')
  @response(200, {
    description: 'Manager PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manager, {partial: true}),
        },
      },
    })
    manager: Manager,
    @param.where(Manager) where?: Where<Manager>,
  ): Promise<Count> {
    return this.managerRepository.updateAll(manager, where);
  }

  @get('/managers/{id}')
  @response(200, {
    description: 'Manager model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Manager, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Manager, {exclude: 'where'}) filter?: FilterExcludingWhere<Manager>
  ): Promise<Manager> {
    return this.managerRepository.findById(id, filter);
  }

  @patch('/managers/{id}')
  @response(204, {
    description: 'Manager PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manager, {partial: true}),
        },
      },
    })
    manager: Manager,
  ): Promise<void> {
    await this.managerRepository.updateById(id, manager);
  }

  @put('/managers/{id}')
  @response(204, {
    description: 'Manager PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() manager: Manager,
  ): Promise<void> {
    await this.managerRepository.replaceById(id, manager);
  }

  @del('/managers/{id}')
  @response(204, {
    description: 'Manager DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.managerRepository.deleteById(id);
  }
}
