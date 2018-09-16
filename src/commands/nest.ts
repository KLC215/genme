import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as pluralize from 'pluralize'
import * as voca from 'voca'

import DatabaseService from '../core/database/database.service'
import {TableColumn} from '../core/database/model/table-column.model'
import {FileUtils} from '../core/utils/file.utils'
import {TemplateUtils} from '../core/utils/template.utils'

import {Table} from './../core/database/database.interface'

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
    database: flags.string({description: 'Database name'}),
    // --port=3306
    port: flags.integer({description: 'Database port', default: 3306})
  }

  async run() {
    const {flags} = this.parse(Nest)
    const {host, database, user, password, port} = flags

    if (database === undefined) {
      this.error('database option is required.')
    }

    cli.action.start('Connecting database')
    // Init database connection
    const databaseService = new DatabaseService({
      host,
      database,
      user,
      password,
      port
    })
    cli.action.stop()
    // Get database connection
    const conn = databaseService.getConnection()
    cli.action.start('Fetching tables')
    // Get all tables in database
    const tableResult = await conn.queryAsync('show tables')
    // Get table names
    const tables = tableResult.map(
      (table: Table) => table[`Tables_in_${database}`]
    )
    cli.action.stop()

    cli.action.start('Fetching columns')
    const columns = []
    for (let table of tables) {
      columns.push(
        conn.queryAsync(`
      select
        COLUMN_NAME              as columnName,
        COLUMN_DEFAULT           as columnDefault,
        IS_NULLABLE              as isNullable,
        DATA_TYPE                as dataType,
        CHARACTER_MAXIMUM_LENGTH as dataLength,
        NUMERIC_PRECISION        as numericPrecision,
        COLUMN_KEY               as columnKey,
        EXTRA                    as extra,
        COLUMN_COMMENT           as columnComment
      from information_schema.COLUMNS
      where TABLE_SCHEMA = '${database}'
        and TABLE_NAME = '${table}';
      `)
      )
    }

    const columnsResult = await Promise.all(columns)
    const tableColumns: TableColumn[] = []

    const len = tables.length
    for (let i = 0; i < len; i++) {
      const tableName = tables[i]
      const entityName = voca.capitalize(voca.camelCase(tables[i]))
      const enityFileName = voca.kebabCase(tables[i])
      const columns = columnsResult[i]
      const routeName = pluralize.plural(voca.camelCase(tables[i]))

      const tableColumn: TableColumn = new TableColumn()
      tableColumn.tableName = tableName
      tableColumn.entityName = entityName
      tableColumn.entityFileName = enityFileName
      tableColumn.columns = columns
      tableColumn.routeName = routeName

      tableColumns.push(tableColumn)
    }
    cli.action.stop()

    cli.action.start('Generating boring code')
    tableColumns.forEach(tableColumn => {
      const serviceContent = TemplateUtils.render('nest/service', {
        entityName: tableColumn.entityName,
        entityFileName: tableColumn.entityFileName
      })
      const entityContent = TemplateUtils.render('nest/entity', {
        tableName: tableColumn.tableName,
        entityName: tableColumn.entityName,
        columns: tableColumn.columns
      })
      const controllerContent = TemplateUtils.render('nest/controller', {
        entityName: tableColumn.entityName,
        entityFileName: tableColumn.entityFileName,
        routeName: tableColumn.routeName
      })
      const moduleContent = TemplateUtils.render('nest/module', {
        entityName: tableColumn.entityName,
        entityFileName: tableColumn.entityFileName
      })

      const path = `${process.cwd()}/${tableColumn.entityFileName}`

      FileUtils.createDirectoryIfNotExist(path)
      FileUtils.writeFile(
        `${path}/${tableColumn.entityFileName}.controller.ts`,
        controllerContent
      )
      FileUtils.writeFile(
        `${path}/${tableColumn.entityFileName}.service.ts`,
        serviceContent
      )
      FileUtils.writeFile(
        `${path}/${tableColumn.entityFileName}.entity.ts`,
        entityContent
      )
      FileUtils.writeFile(
        `${path}/${tableColumn.entityFileName}.module.ts`,
        moduleContent
      )
    })
    cli.action.stop()

    this.exit()
  }
}
