# file-utils-processors-ts

[![Bun CI](https://github.com/julianrojas87/file-utils-processors-ts/actions/workflows/build-test.yml/badge.svg)](https://github.com/julianrojas87/file-utils-processors-ts/actions/workflows/build-test.yml) [![npm](https://img.shields.io/npm/v/file-utils-processors-ts.svg?style=popout)](https://npmjs.com/package/file-utils-processors-ts)

Connector Architecture Typescript processors for handling file operations. It currently exposes 5 functions:

### [`js:GlobRead`](https://github.com/julianrojas87/file-utils-processors-ts/blob/main/processors.ttl#L10)

This function relies on the [`glob`](https://www.npmjs.com/package/glob) library to select a set of files according to a shell expression and stream them out in a sequential fashion. A `wait` parameter can be defined to wait x milliseconds between file streaming operations.

### [`js:FolderRead`](https://github.com/julianrojas87/file-utils-processors-ts/blob/main/processors.ttl#L52)

This function reads all the files present in a given folder and streams out their content in a sequential fashion. A `maxMemory` parameter can be given (in GB) to defined threshold of maximum used memory by the streaming process. When the threshold is exceeded, the streaming process will pause for as many  milliseconds as defined by the `pause` parameter.

### [`js:Substitute`](https://github.com/julianrojas87/file-utils-processors-ts/blob/main/processors.ttl#L103)

This function transform a stream by applying a given string substitution on each of the messages. The matching string can be a regex defined by the `source` property and setting the `regexp` property to `true`.

### [`js:Envsub`](https://github.com/julianrojas87/file-utils-processors-ts/blob/main/processors.ttl#L167)

This function substitute all the defined environment variables on each of the elements of an input stream that have been labeled with a `${VAR_NAME}` pattern.

### [`js:ReadFile`](https://github.com/julianrojas87/file-utils-processors-ts/blob/main/processors.ttl#L202)

This function can read on demand and push downstream the contents of a file located in a predefined folder. This processor is used mostly for testing and demonstrating pipeline implementations.

### [`js:UnzipFile`](https://github.com/julianrojas87/file-utils-processors-ts/blob/main/processors.ttl#L247)

This function can receive a zipped file in the form of a Buffer and stream out its decompressed contents.
