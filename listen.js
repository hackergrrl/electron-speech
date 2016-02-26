var speech = require('./index')
var argv = require('minimist')(process.argv.slice(2))

var continuous = argv.continuous || argv.c
var quiet = argv.quiet || argv.q

var c = speech('en_US', continuous)

c.listen()

c.on('ready', function () {
  if (!quiet) {
    console.log('listening..')
  }
})

c.on('text', function (text) {
  console.log(text)

  if (!continuous) {
    process.exit(0)
  }
})

c.on('error', function (err) {
  console.error(err)
})

c.on('close', function () {
  process.exit(0)
})
