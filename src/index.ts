/// <reference path="index.d.ts" />

import { openSync, readSync, closeSync } from "fs"

export function *LineReader(filePathOrStdin: string | (typeof process.stdin), fromLine = 0, toLine = Infinity, chunkSizeInBytes = 64 * 1024): IterableIterator<string> {
   let fd
   if (typeof filePathOrStdin === "string") 
      fd = openSync(filePathOrStdin, "r") 
   else if (filePathOrStdin.fd !== undefined)
      fd = filePathOrStdin.fd
   else 
      throw "Invalid Argument: 1st argument must be a valid file path or process.stdin"

   let lastLine: string

   let position = 0
   let lineNum = 0
   while (true) {
      const buf = new Buffer(chunkSizeInBytes)
      let bytesLen
      // try catch block has no performance penalty
      try {
         bytesLen = readSync(fd, buf, 0, chunkSizeInBytes, position)
      } catch (e) {
         // Not sure why I am getting Error: EOF: end of file, read
         // when I do 'cat "somefile" | node dist/tests/test.js.' OR
         // 'echo "sometext" | node dist/tests/test.js' However
         // I don't get any error when I do  node dist/tests/test.js < somefile.
         // this catch statemenet will handle that case.
         if (e.code == 'EOF') 
            bytesLen = 0 
         else 
            throw e
      }

      if (!bytesLen) break

      const lines = [lastLine, buf.toString("UTF-8", 0, bytesLen)].join("").split(/\r?\n|\r(?!\n)/)
      lastLine = lines.pop()
      if (lines.length) {
         for (const line of lines) {
            if (line) if (lineNum >= fromLine && lineNum <= toLine) yield line
            lineNum += 1
         }
      }

      position += bytesLen
   }  
   if (lastLine) if (lineNum >= fromLine && lineNum <= toLine) yield lastLine
   closeSync(fd)
}