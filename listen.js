var speech = require('./index')
var argv = require('minimist')(process.argv.slice(2))

var continuous = argv.continuous || argv.c
var quiet = argv.quiet || argv.q

var c = speech({ language: 'en_US', continuous: continuous })

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
  console.error('error:', err)
})

c.on('end', function () {
  console.log('done')
  process.exit(0)
})
