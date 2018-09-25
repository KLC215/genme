import {Command, flags} from '@oclif/command'

import {DatabaseHelper} from '../core/database/database.helper'
import {NestGenerator} from '../modules/nest/nest.generator'

export default class Nest extends Command {
  static description = 'Generate Nest.js boring code'

  static flags = {
    // -h, --help
    help: flags.help({char: 'h'}),
    // --host=localhost
    host: flags.string({
      description: 'Database host name',
      default: 'localhost'
    }),
    // --user=root
    user: flags.string({
      description: 'Database username',
      default: 'root'
    }),
    // --password=root
    password: flags.string({
      description: 'Database password',
      default: 'root'
    }),
    // --database=VALUE
    database: flags.string({description: 'Database name', required: true}),
    // --port=3306
    port: flags.integer({description: 'Database port', default: 3306})
  }

  async run() {
    const {flags} = this.parse(Nest)
    const {host, database, user, password, port} = flags

    const [conn, databaseService] = DatabaseHelper.connect({
      host,
      database,
      user,
      password,
      port
    })
    const tables = await DatabaseHelper.fetchAllTables(conn, database)
    const tableColumns = await DatabaseHelper.fetchColumns(
      conn,
      database,
      tables
    )

    NestGenerator.generate(tableColumns)
    databaseService.close()

    this.exit()
  }
}
