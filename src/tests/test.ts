/*
Command line usage:
   cat "file1" "file2" | node dist/tests/test.js
   echo "some text" | node dist/tests/test.js
   node dist/tests/test.js < "file"
*/

import { LineReader } from "../index"

const arg = process.argv[2]

const filePathOrStdin = arg ? arg : process.stdin

for (const line of LineReader(filePathOrStdin)) {
   console.log(line)
}

console.log([...LineReader(filePathOrStdin)])
