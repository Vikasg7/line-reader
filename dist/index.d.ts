/// <reference path="../src/index.d.ts" />
export declare function LineReader(fileOrStdinOrFd: string | (typeof process.stdin) | number, fromLine?: number, toLine?: number, chunkSizeInBytes?: number): IterableIterator<string>;
