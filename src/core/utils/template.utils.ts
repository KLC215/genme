// @ts-ignore
import * as edge from 'edge.js'
import * as path from 'path'

edge.registerViews(path.join(__dirname, '../../templates'))

edge.global('convertType', (type: string) => {
  switch (type) {
  case 'char':
  case 'varchar':
  case 'text':
  case 'tinytext':
  case 'mediumtext':
  case 'longtext':
  case 'time':
  case 'geometry':
  case 'set':
  case 'enum':
    return 'string'
  case 'integer':
  case 'int':
  case 'smallint':
  case 'mediumint':
  case 'bigint':
  case 'double':
  case 'decimal':
  case 'numeric':
  case 'float':
  case 'year':
    return 'number'
  case 'tinyint':
    return 'boolean'
  case 'json':
    return 'Object'
  case 'date':
  case 'datetime':
  case 'timestamp':
    return 'Date'
  case 'tinyblob':
  case 'mediumblob':
  case 'longblob':
  case 'blob':
  case 'binary':
  case 'varbinary':
  case 'bit':
    return 'Buffer'
  default:
    return 'string'
  }
})

export namespace TemplateUtils {
  export function render(template: string, data: object): string {
    return edge.render(template, data)
  }
}
