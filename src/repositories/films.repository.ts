import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {Films, FilmsRelations} from '../models';

export class FilmsRepository extends DefaultCrudRepository<
  Films,
  typeof Films.prototype.id,
  FilmsRelations
> {
  constructor(
    @inject('datasources.postgreSQL') dataSource: PostgreSqlDataSource,
  ) {
    super(Films, dataSource);
  }
}
