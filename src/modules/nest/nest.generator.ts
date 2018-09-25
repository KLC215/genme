import cli from 'cli-ux'

import {TableColumn} from '../../core/database/model/table-column.model'
import {FileUtils} from '../../core/utils/file.utils'
import {TemplateUtils} from '../../core/utils/template.utils'

export namespace NestGenerator {
  export function generate(tableColumns: TableColumn[]): void {
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

      const path = `${process.cwd()}/src/${tableColumn.entityFileName}`

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
  }
}
