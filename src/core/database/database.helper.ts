import cli from 'cli-ux'
import * as pluralize from 'pluralize'
import * as voca from 'voca'

import {
  DatabaseConfig,
  PromisifiedConnection,
  Table
} from './database.interface'
import DatabaseService from './database.service'
import {TableColumn} from './model/table-column.model'

export namespace DatabaseHelper {
  export function connect({
    host,
    database,
    user,
    password,
    port
  }: DatabaseConfig): [PromisifiedConnection, DatabaseService] {
    cli.action.start('Connecting database')
    const databaseService = new DatabaseService({
      host,
      database,
      user,
      password,
      port
    })
    const conn = databaseService.getConnection()
    cli.action.stop()

    return [conn, databaseService]
  }

  export async function fetchAllTables(
    conn: PromisifiedConnection,
    database: string
  ): Promise<Table[]> {
    cli.action.start('Fetching tables')
    // Get all tables in database
    const tableResult = await conn.queryAsync('show tables')
    // Get table names
    const tables = tableResult.map(
      (table: Table) => table[`Tables_in_${database}`]
    )
    cli.action.stop()

    return tables
  }

  export async function fetchColumns(
    conn: PromisifiedConnection,
    database: string,
    tables: Table[]
  ): Promise<TableColumn[]> {
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
      const tableName = tables[i].toString()
      const entityName = voca.capitalize(voca.camelCase(tables[i].toString()))
      const enityFileName = voca.kebabCase(tables[i].toString())
      const columns = columnsResult[i]
      const routeName = pluralize.plural(voca.camelCase(tables[i].toString()))

      const tableColumn: TableColumn = new TableColumn()
      tableColumn.tableName = tableName
      tableColumn.entityName = entityName
      tableColumn.entityFileName = enityFileName
      tableColumn.columns = columns
      tableColumn.routeName = routeName

      tableColumns.push(tableColumn)
    }
    cli.action.stop()

    return tableColumns
  }
}
