import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {OmdbDataSource} from '../datasources';
import {Film} from '../interfaces/film.interface';

interface FilmsResponse {
  Search: [Film],
  totalResults: string,
  Response: string
}

export interface SearchFilm {
  searchFilm(searchTerm: string, apikey: string): Promise<FilmsResponse>;
}

export class SearchFilmProvider implements Provider<SearchFilm> {
  constructor(
    // omdb must match the name property in the datasource json file
    @inject('datasources.omdb')
    protected dataSource: OmdbDataSource = new OmdbDataSource(),
  ) { }

  value(): Promise<SearchFilm> {
    return getService(this.dataSource);
  }
}
