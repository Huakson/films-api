import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'omdb',
  connector: 'rest',
  baseURL: 'https://www.omdbapi.com',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://www.omdbapi.com/?s={searchTerm}&apikey={apikey}',
      },
      functions: {
        searchFilm: ['searchTerm', 'apikey'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OmdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'omdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.omdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
