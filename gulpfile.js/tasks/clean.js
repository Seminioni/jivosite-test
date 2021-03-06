const gulp = require('gulp')
const del  = require('del')
const path = require('path')

const cleanTask = function () {
  var patterns = TASK_CONFIG.clean && TASK_CONFIG.clean.patterns ?
    TASK_CONFIG.clean.patterns :
    path.resolve(process.env.PWD, PATH_CONFIG.dest)

  return del(patterns, { force: true })
}

module.exports = cleanTask
