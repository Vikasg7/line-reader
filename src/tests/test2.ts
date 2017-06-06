/*
This test was written to test feasibilty of my idea to write this module
*/

import { readSync } from "graceful-fs"

const fd = process.stdin.fd || 0
const bufSize = 64 * 1024
let position = 0
let data = ''

while (true) {
   const buf = new Buffer(bufSize)
   const bytesLen = readSync(fd, buf, 0, bufSize, position)
   if (!bytesLen) break
   position += bytesLen
   data += buf.toString("utf8", 0, bytesLen)
}

console.log(data)