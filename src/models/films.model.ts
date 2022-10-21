import {Entity, model, property} from '@loopback/repository';
import {v4} from 'uuid';
@model({settings: {strict: false}})
export class Films extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  Title: string;

  @property({
    type: 'string',
    required: true,
  })
  Year: string;

  @property({
    type: 'string',
    required: true,
  })
  imdbID: string;

  @property({
    type: 'string',
    required: true,
  })
  Type: string;

  @property({
    type: 'string',
    required: false,
  })
  Poster: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Films>) {
    super(data);
    if (!this.id) {
      this.id = v4();
    }
  }
}

export interface FilmsRelations {
  // describe navigational properties here
}

export type FilmsWithRelations = Films & FilmsRelations;
