const gulp            = require('gulp')
const getEnabledTasks = require('../lib/getEnabledTasks')
const os              = require('os')
const fs              = require('fs')
const del               = require('del')
const path            = require('path')
const removeFalsyTasks = require('../lib/removeFalsyTasks')

const productionTask = function(cb) {
  global.production = true

  // Build to a temporary directory, then move compiled files as a last step
  PATH_CONFIG.finalDest = PATH_CONFIG.dest
  PATH_CONFIG.dest = PATH_CONFIG.temp
      ? path.join(process.env.PWD, PATH_CONFIG.temp)
      : path.join(os.tmpdir(), 'gulp-starter')

  // Make sure the temp directory exists and is empty
  del.sync(PATH_CONFIG.dest, { force: true })
  fs.mkdirSync(PATH_CONFIG.dest)

  const tasks = getEnabledTasks('production')
  const rev = TASK_CONFIG.production.rev ? 'rev': false
  const static = TASK_CONFIG.static ? 'static' : false
  const { prebuild, postbuild } = TASK_CONFIG.additionalTasks.production
  //
  return removeFalsyTasks(['clean', prebuild, tasks.assetTasks, tasks.codeTasks, rev, 'sizeReport', static, 'replaceFiles', postbuild])
}

module.exports = productionTask
