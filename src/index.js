const textToTone = require("./textTone.js")
const buildNotes = require("./buildNotes.js")
const audioCtx = new AudioContext()
const tempo = 200
const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

let session = []
let notes = []
let noteID = 0;
let nextNotetime = 0.0
let timerID;

chrome.browserAction.setBadgeText({text: " "})
chrome.browserAction.setBadgeBackgroundColor({"color": "#ff0000"})

const nextNote = () => {
  const secPerBeat = 60.0 / tempo
  nextNoteTime += secPerBeat
  noteID++
  // fix note stopping here
  if(noteID >= notes.length){
    chrome.browserAction.setBadgeBackgroundColor({"color": "#00ff00"})
    window.clearTimeout(timerID)
  }
}

const scheduleNote = (_noteID, time) => {
  play(notes[_noteID], time)
}

function scheduler() {
  // while there are notes that will need to play before the next interval,
  // schedule them and advance the pointer.
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
      scheduleNote(noteID, nextNoteTime);
      nextNote();
  }
  timerID = window.setTimeout(scheduler, lookahead);
}

const play = (note, time) => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.5, time);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 2)
  gainNode.connect(audioCtx.destination)

  oscillator.type = note.type
  oscillator.frequency.setValueAtTime(note.freq, 0)
  oscillator.connect(gainNode)
  oscillator.start(time)

  setTimeout(() => {
    oscillator.stop()
    oscillator.disconnect()
  }, 2000)
}

// interactions

chrome.browserAction.onClicked.addListener(tab => {
  chrome.browserAction.setBadgeBackgroundColor({"color": "#0000ff"})
  notes = buildNotes.default(session)
  nextNoteTime = audioCtx.currentTime
  noteID = 0
  scheduler()
});

// listening for messages from tabs
chrome.runtime.onMessage.addListener( async(req, sender, sendResponse) => {
  if(req.content){
    session = []
    session.push(await textToTone.default(req.content))
  }

});




