const buildNotes = arr => {
  const notes = []
  arr.map(page => {
    page.sentences_tone.map(sentence => {
      if(sentence.tones){
        sentence.tones.map(tone => {
          if(tone.score <= 0.6){
            notes.push({note: "D", freq: 293.66})
          }else if(tone.score <= 0.7){
            notes.push({note: "F", freq: 349.23})
          }else if(tone.score <= 0.8){
            notes.push({note: "G", freq: 392.0})
          }else if(tone.score <= 0.9){
            notes.push({note: "A", freq: 440.0})
          }else if(tone.score <= 1.0){
            notes.push({note: "C", freq: 523.26})
          }else if(tone.score === 1){
            notes.push({note: "D", freq:  587.32})
          }
        })
      }
    })
  })

  return notes
}

export default buildNotes
