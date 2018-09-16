import {Column} from '../database.interface'

export class TableColumn {
  private _tableName: string
  private _entityName: string
  private _entityFileName: string
  private _columns: Column
  private _routeName: string

  constructor(tableName: string, entityName: string, entityFileName: string, columns: Column, routeName: string) {
    this._tableName = tableName
    this._entityName = entityName
    this._entityFileName = entityFileName
    this._columns = columns
    this._routeName = routeName
  }

  get tableName(): string {
    return this._tableName
  }

  set tableName(value: string) {
    this._tableName = value
  }

  get entityName(): string {
    return this._entityName
  }

  set entityName(value: string) {
    this._entityName = value
  }

  get entityFileName(): string {
    return this._entityFileName
  }

  set entityFileName(value: string) {
    this._entityFileName = value
  }

  get columns(): Column {
    return this._columns
  }

  set columns(value: Column) {
    this._columns = value
  }

  get routeName(): string {
    return this._routeName
  }

  set routeName(value: string) {
    this._routeName = value
  }
}
