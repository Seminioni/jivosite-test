#!/usr/bin/env node
const path = require('path')

const additionalArgs = require('minimist')(process.argv.slice(2))._
const blendidEntryDir = path.resolve(__dirname, '../gulpfile.js')
const gulpModulePath = path.dirname(require.resolve('gulp'))
const gulpBinaryFile = path.join(gulpModulePath, '/bin/gulp')

console.log("this is adds args", additionalArgs)
console.log("this is blendidEntryDirn", blendidEntryDir)

let args = ['--gulpfile', blendidEntryDir]

if(additionalArgs.length) {
  args = args.concat(additionalArgs)
}

require('child_process').fork(gulpBinaryFile, args)
