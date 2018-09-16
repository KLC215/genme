import {Connection} from 'mysql'

export interface DatabaseConfig {
  readonly host: string | undefined
  readonly database: string | undefined
  readonly user: string | undefined
  readonly password: string | undefined
  readonly port: number | undefined
}

export interface Column {
  readonly columnName: string
  readonly columnDefault: any
  readonly isNullable: 'YES' | 'NO'
  readonly dataType: string
  readonly dataLength: number | null
  readonly numericPrecision: number | null
  readonly columnKey: string | null
  readonly extra: string | null
  readonly columnComment: string | null
}

export interface PromisifiedConnection extends Connection {
  [x: string]: any
}

export interface Table {
  [key: string]: any
}
