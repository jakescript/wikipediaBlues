const axios = require("axios")
const audioCtx = new AudioContext()
const tempo = 200
const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

let session = []
let notes = []
let noteID = 0;
let nextNotetime = 0.0
let timerID;

const textToTone = async text => {
  const url = 'https://api.us-east.tone-analyzer.watson.cloud.ibm.com/instances/aafa0a79-931d-4dfb-a251-f1080fbd6db9/v3/tone?version=2017-09-21'
  try {
    const {data} = await axios.post(url,{ text },
      {
        auth: {
          username: "apikey",
          password: "isT284_w63-M6qwoIL08FnjHg6TpyVFYwSBdyMlgik7q"
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    if(data){
      console.log(data)
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

const noteList = arr => {
  const tones = []
  arr.map(page => {
    page.sentences_tone.map(sentence => {
      if(sentence.tones){
        sentence.tones.map(tone => {
          if(tone.score <= 0.6){
            tones.push({note: "D", freq: 293.66})
          }else if(tone.score <= 0.7){
            tones.push({note: "F", freq: 349.23})
          }else if(tone.score <= 0.8){
            tones.push({note: "G", freq: 392.0})
          }else if(tone.score <= 0.9){
            tones.push({note: "A", freq: 440.0})
          }else if(tone.score <= 1.0){
            tones.push({note: "C", freq: 523.26})
          }else if(tone.score === 1){
            tones.push({note: "D", freq:  587.32})
          }
        })
      }
    })
  })

  return tones
}



const nextNote = () => {
  const secPerBeat = 60.0 / tempo
  nextNoteTime += secPerBeat
  noteID++
  // fix note stopping here
  if(noteID === notes.length){
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
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.25)
  gainNode.connect(audioCtx.destination)

  oscillator.type = "sine"
  oscillator.frequency.setValueAtTime(note.freq, 0)
  oscillator.connect(gainNode)
  oscillator.start(time)

  setTimeout(() => {
    oscillator.stop()
    oscillator.disconnect()
  }, 250)
}

const clicked = tab => {
  notes = noteList(session)
  nextNoteTime = audioCtx.currentTime
  noteID = 0
  scheduler()
};

chrome.browserAction.onClicked.addListener(clicked);

// listening for messages from tabs
chrome.runtime.onMessage.addListener(async(req, sender, sendResponse) => {
  session = []
  session.push(await textToTone(req.content))
});




