import {Entity, model, property, hasMany} from '@loopback/repository';
import {VehicleRequest} from './vehicle-request.model';

@model()
export class Vehicle extends Entity {
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
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  picture: string;

  @property({
    type: 'string',
  })
  video?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  rent_value: number;

  @property({
    type: 'string',
    required: true,
  })
  in_charge_person: string;

  @property({
    type: 'string',
    required: true,
  })
  in_charge_contact: string;

  @hasMany(() => VehicleRequest)
  vehicleRequests: VehicleRequest[];

  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
