const buildNotes = arr => {
  const notes = []
  arr.map(page => {
    page.sentences_tone.map(sentence => {
      if(sentence.tones){
        sentence.tones.map(tone => {
          if(tone.score <= 0.6){
            notes.push({note: "D", freq: 293.66, type: "sawtooth"})
          }else if(tone.score <= 0.7){
            notes.push({note: "F", freq: 349.23, type: "square"})
          }else if(tone.score <= 0.8){
            notes.push({note: "G", freq: 392.0, type: "triangle"})
          }else if(tone.score <= 0.9){
            notes.push({note: "A", freq: 440.0, type: "sine"})
          }else if(tone.score <= 1.0){
            notes.push({note: "C", freq: 523.26, type: "triangle"})
          }else if(tone.score === 1){
            notes.push({note: "D", freq:  587.32, type: "sawtooth"})
          }
        })
      }
    })
  })

  return notes
}

export default buildNotes
