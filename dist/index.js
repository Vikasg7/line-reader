"use strict";
/// <reference path="index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const graceful_fs_1 = require("graceful-fs");
function* LineReader(fileOrStdinOrFd, fromLine = 0, toLine = Infinity, chunkSizeInBytes = 64 * 1024) {
    let fd;
    if (typeof fileOrStdinOrFd === "string")
        fd = graceful_fs_1.openSync(fileOrStdinOrFd, "r");
    else if (typeof fileOrStdinOrFd === "number")
        fd = fileOrStdinOrFd;
    else if (fileOrStdinOrFd.fd !== undefined)
        fd = fileOrStdinOrFd.fd;
    else
        throw "Invalid Argument: 1st argument must be a valid file path or process.stdin";
    let lastLine;
    let position = 0;
    let lineNum = 0;
    while (true) {
        const buf = new Buffer(chunkSizeInBytes);
        let bytesLen;
        // try catch block has no performance penalty
        try {
            bytesLen = graceful_fs_1.readSync(fd, buf, 0, chunkSizeInBytes, position);
        }
        catch (e) {
            // Not sure why I am getting Error: EOF: end of file, read
            // when I do 'cat "somefile" | node dist/tests/test.js.' OR
            // 'echo "sometext" | node dist/tests/test.js' However
            // I don't get any error when I do  node dist/tests/test.js < somefile.
            // this catch statemenet will handle that case.
            if (e.code == 'EOF')
                bytesLen = 0;
            else
                throw e;
        }
        if (!bytesLen)
            break;
        const lines = [lastLine, buf.toString("binary", 0, bytesLen)].join("").split(/\r?\n|\r(?!\n)/);
        lastLine = lines.pop();
        if (lines.length) {
            for (const line of lines) {
                if (line)
                    if (lineNum >= fromLine && lineNum <= toLine)
                        yield line;
                lineNum += 1;
            }
        }
        position += bytesLen;
    }
    if (lastLine)
        if (lineNum >= fromLine && lineNum <= toLine)
            yield lastLine;
    graceful_fs_1.closeSync(fd);
}
exports.LineReader = LineReader;
//# sourceMappingURL=index.js.map