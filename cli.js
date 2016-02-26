#!/usr/bin/env node

var spawn = require('electron-spawn')
var s = spawn('listen.js', process.argv.slice(2).join(' '))
s.stdout.pipe(process.stdout)
s.stderr.pipe(process.stderr)
