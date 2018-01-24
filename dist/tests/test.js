"use strict";
/*
Command line usage:
   cat "file1" "file2" | node dist/tests/test.js
   echo "some text" | node dist/tests/test.js
   node dist/tests/test.js < "file"
*/
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const arg = process.argv[2];
const filePathOrStdin = arg ? arg : process.stdin;
for (const line of index_1.LineReader(filePathOrStdin)) {
    console.log(line);
}
console.log([...index_1.LineReader(filePathOrStdin)]);
//# sourceMappingURL=test.js.map