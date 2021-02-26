const axios = require("axios")
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
export default textToTone
