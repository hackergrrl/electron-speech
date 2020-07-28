# electron-speech

> Speech recognition in node and the browser using Electron.

## DEFUNCT

It
[seems](http://stackoverflow.com/questions/36214413/webkitspeechrecognition-returning-network-error-in-electron)
that Google
[has](https://groups.google.com/a/chromium.org/forum/#!topic/chromium-html5/JJe6KD7-bb8)
shut down the Chrome Speech API for use in shell environments like Electron, which `electron-speech` relies on.

Some other directions to pursue instead include:

1. [webkitSpeechRecognition in the browser](https://gist.github.com/noffle/968d694c3bffa055cfd3a4d9b1b13380). This works if you are using a Chrome-based browser that isn't a shell like Electron.
2. [Sonus](https://github.com/evancohen/sonus): node module that is optimized
   for low powered devices and provides *customizable* offline hotword detection
   with real-time streaming results (via [Google Cloud
   Speech](https://github.com/googlecloudplatform/google-cloud-node#google-cloud-speech-alpha)
   and others).
3. If you are looking for a purely offline option:
   [node-pocketsphinx](https://github.com/cmusphinx/node-pocketsphinx)
4. [Jasper](https://jasperproject.github.io/) looks promising, but is
   Python-based. Go forth and write a node wrapper around it!

## Prerequisites

If you want to use the API from a script using Node, you will need to launch
your script using the
[`electron-spawn`](https://www.npmjs.com/package/electron-spawn) command instead
of the `node` command:

```sh
$ npm install -g electron-spawn

$ electron-spawn example.js
```

## Usage

### CLI

This module installs the `electron-speech` command:

```
$ electron-speech
listening..
(whatever is said is written here, to stdout)
```

`-q|--quiet` to omit the `listening..` message. (it's on stderr anyways though)

`-c|--continuous` to keep on listening after each result.

### API

```javascript
var Speech = require('electron-speech')

var recog = Speech({
  lang: 'en-US',
  continuous: true
})

recog.on('text', function (text) {
  console.log(text)
});

recog.listen()
```

### Methods

#### var speech = Speech(opts)

Returns `speech`, an EventEmitter and Readable stream.

`opts` accepts multiple keys:

- `opts.lang` - recognize speech in the language `lang`. Defaults to `'en-US'`.
- `opts.continuous` - if true, `text` events will keep on being emitted as recognition
occurs.

#### speech.listen()

Starts listening to speech via the microphone. `'ready`'` will be emitted once speech
recognition has begun.

#### speech.pipe(stream)

Uses `speech` as a readable stream for text rather than an event emitter.
Results have newlines appended to them for parsing convenience.

#### speech.on('ready')

Emitted when the microphone has begun to listen for speech.

#### speech.on('text', function (text) {})

Emitted when speech has been recognized.

#### speech.on('error', function (err) {})

Emitted when an error has occurred in recognition.

#### speech.on('close')

Emitted when recognition has ended. Does not fire if `continuous` was set to
true.

## License

ISC
