import {promisifyAll} from 'bluebird'
import * as mysql from 'mysql'

import {DatabaseConfig, PromisifiedConnection} from './database.interface'

export default class DatabaseService {
  private readonly connection: PromisifiedConnection

  constructor({host, port, user, password, database}: DatabaseConfig) {
    promisifyAll(mysql)
    promisifyAll(require('mysql/lib/Connection').prototype)

    this.connection = mysql.createConnection({
      host,
      port,
      user,
      password,
      database
    })
  }

  getConnection(): PromisifiedConnection {
    this.connection.connect()
    return this.connection
  }

  close(): void {
    this.connection.end()
  }
}
