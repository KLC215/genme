import * as fs from 'fs'

export namespace FileUtils {
  export function writeFile(path: string, content: string): void {
    fs.writeFileSync(path, content)
  }

  export function createDirectoryIfNotExist(path: string): void {
    if (fs.existsSync(path)) {
      return
    }
    fs.mkdirSync(path)
  }
}
