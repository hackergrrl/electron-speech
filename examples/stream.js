// to be run with 'electron-spawn'

var Speech = require('./index')

var s = Speech({ continuous: true })
s.pipe(process.stdout)
s.listen()

s.on('end', function() { process.exit(0) })
