var EventEmitter = require('events')
var util = require('util')
var defined = require('defined')
var Readable = require('readable-stream')

module.exports = Speech

util.inherits(Speech, EventEmitter)
util.inherits(Speech, Readable)

function Speech (opts) {
  if (!(this instanceof Speech)) { return new Speech(opts) }

  opts = defined(opts, {})

  EventEmitter.call(this)
  Readable.call(this)

  this.recognition = new webkitSpeechRecognition()
  this.recognition.lang = defined(opts.lang, 'en-US')
  this.continuous = defined(opts.continuous, false)

  this._read = function (size) {}
}

Speech.prototype.listen = function () {
  if (!('webkitSpeechRecognition' in window)) {
    this.emit('error', 'no speech api support')
    return
  } else {
    var done = false
    var self = this
    var recognition = this.recognition
    recognition.continuous = this.continuous
    recognition.interimResults = false
    recognition.onstart = function () {
      self.emit('ready')
    }
    recognition.onresult = function (event) {
      if (done) {
        return
      }
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var result = event.results[i]
        if (result.isFinal) {
          var alt = result[0]
          result = alt.transcript.trim()
          self.emit('text', result)
          self.push(result + '\n')

          if (!self.continuous) {
            recognition.stop()
            done = true
            self.push(null)
          }
        }
      }
    }
    recognition.onerror = function (err) {
      self.emit('error', err)
    }
    recognition.onend = function () {
      self.emit('end')
    }

    recognition.start()
  }
}
