const {validate} = require('jsonschema')
const axios = require('axios')
const {APIError} = require('../helpers')
const queryString = require('query-string');
const WaveFile = require('wavefile').WaveFile;
const arrayBufferToAudioBuffer = require('arraybuffer-to-audiobuffer')

async function getLanguages(request,response,next) {
  try {
    const languages = await axios({
      method: 'get',
      url: 'http://localhost:5500/api/languages'+ queryString.stringify(request.query)
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}

async function getVoices(request,response,next) {
  try {
    const voices = await axios({
      method: 'get',
      url: 'http://localhost:5500/api/voices?'+ queryString.stringify(request.query)
    })
    return response.status(201).json(voices.data)
  } catch (error) {
    return next(error)
  }
}

async function getAudio(request,response,next) {
  try {
    const voices = await axios({
      method: 'get',
      url: 'http://localhost:5500/api/tts?'+ queryString.stringify(request.query),
      responseType: 'arraybuffer'
    })
    return response.status(201).header({
      'content-type': 'audio/wav',
    }).send(voices.data)
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

module.exports = {
  getLanguages,
  getVoices,
  getAudio
}
