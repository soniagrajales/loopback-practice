import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Customer} from './customer.model';
import {Manager} from './manager.model';
import {Vehicle} from './vehicle.model';

@model()
export class VehicleRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'date',
    required: true,
  })
  initial_date: string;

  @property({
    type: 'date',
    required: true,
  })
  end_date: string;

  @property({
    type: 'number',
    required: true,
  })
  total_rent: number;

  @property({
    type: 'string',
  })
  comments?: string;

  @belongsTo(() => Customer)
  customerId: string;

  @belongsTo(() => Manager)
  managerId: string;

  @belongsTo(() => Vehicle)
  vehicleId: string;

  constructor(data?: Partial<VehicleRequest>) {
    super(data);
  }
}

export interface VehicleRequestRelations {
  // describe navigational properties here
}

export type VehicleRequestWithRelations = VehicleRequest & VehicleRequestRelations;
