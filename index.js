var EventEmitter = require('events')
var util = require('util')
var defined = require('defined')

module.exports = Speech

util.inherits(Speech, EventEmitter)

function Speech (lang, continuous) {
  if (!(this instanceof Speech)) { return new Speech(lang, continuous) }

  EventEmitter.call(this)

  this.recognition = new webkitSpeechRecognition()
  this.recognition.lang = defined(lang, 'en-US')
  this.continuous = defined(continuous, false)
}

Speech.prototype.listen = function () {
  if (!('webkitSpeechRecognition' in window)) {
    this.emit('error', 'no speech api support')
    return
  } else {
    console.error('begin')
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
          if (!self.continuous) {
            recognition.stop()
            done = true
          }
          var alt = result[0]
          result = alt.transcript.trim()
          self.emit('text', result)
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
