import { openSync, statSync, readSync, closeSync } from "graceful-fs"

export function *LineReader(filePath: string, fromLine = 0, toLine = Number.MAX_SAFE_INTEGER): IterableIterator<string> {
   const fd = openSync(filePath, "r")
   const fileSize = statSync(filePath).size
   const defaultChunkSize = 64 * 1024
   let chunkSize = Math.min(defaultChunkSize, fileSize)
   let lastLine: string

   let position = 0
   let lineNum = 0
   while (position < fileSize) {
      const bufferRead = new Buffer(chunkSize)
      const bufferSize = readSync(fd, bufferRead, 0, chunkSize, position)

      const lines = [lastLine, bufferRead.toString("UTF-8")].join("").split(/\r?\n|\r(?!\n)/)
      lastLine = lines.pop()
      if (lines.length) {
         for (const line of lines) {
            if (line) if (lineNum >= fromLine && lineNum <= toLine) yield line
            lineNum += 1
         }
      }

      position += bufferSize
      chunkSize = Math.min(defaultChunkSize, fileSize - position)
   }  
   if (lastLine) if (lineNum >= fromLine && lineNum <= toLine) yield lastLine
   closeSync(fd)
}