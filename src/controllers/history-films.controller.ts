// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, HttpErrors, OperationObject} from '@loopback/rest';
import {Film} from '../interfaces/film.interface';
import {Films} from '../models';
import {FilmsRepository} from '../repositories';

const FILM_SPEC: OperationObject = {
  responses: {
    '200': {
      description: "Find all films searched in application",
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Films, {includeRelations: false}),
          },
        }
      },
    }
  }
}

export class HistoryFilmsController {
  constructor(
    @repository(FilmsRepository)
    public filmsRepository: FilmsRepository,
  ) { }

  @get('/history', FILM_SPEC)
  async historyFilms(): Promise<Film[]> {
    try {
      return await this.filmsRepository.find();
    } catch (error) {
      throw new HttpErrors.InternalServerError(error);
    }
  }

}
