import * as fs from 'fs'

export default class FileUtils {
  static writeFile(path: string, content: string): void {
    fs.writeFileSync(path, content)
  }

  static createDirectoryIfNotExist(path: string): void {
    if (fs.existsSync(path)) {
      return
    }
    fs.mkdirSync(path)
  }
}
