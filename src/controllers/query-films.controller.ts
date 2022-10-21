import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, HttpErrors, OperationObject} from '@loopback/rest';
import {Film} from '../interfaces/film.interface';
import {Films} from '../models';
import {FilmsRepository} from '../repositories';
import {SearchFilm} from '../services';

const FILM_SPEC: OperationObject = {
  parameters: [
    {name: 'title', schema: {type: 'string'}, in: 'query'}
  ],
  responses: {
    '200': {
      description: "Search film by title",
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

export class QueryFilmsController {
  constructor(
    @inject('services.SearchFilm')
    private omdb: SearchFilm,
    @repository(FilmsRepository)
    public filmsRepository: FilmsRepository,
  ) { }

  @get('/query', FILM_SPEC)
  async queryFilms(title: string): Promise<[Film]> {

    const omdbApiKey = process.env.OMDB_APIKEY ?? '';

    const films = await this.omdb.searchFilm(title, omdbApiKey);

    if (films.Response !== 'True')
      throw new HttpErrors.BadRequest(
        `Nenhum filme foi encontrado!`,
      );

    const filteredFilms = await this.filterIfItExists(films.Search);

    await this.filmsRepository.createAll(filteredFilms);

    return films.Search;
  }

  private async filterIfItExists(films: [Film]) {
    const imdbIDList = films.map((film) => {
      return {
        imdbID: film.imdbID
      }
    });

    const filmsExists = await this.filmsRepository.find({
      where: {
       or: imdbIDList
      }
    });

    const filteredFilms = films.filter(fm1 =>
      filmsExists.every(fm2 => fm2.imdbID !== fm1.imdbID));

    return filteredFilms;
  }
}
