const {validate} = require('jsonschema')
const axios = require('axios')
const {APIError} = require('../helpers')
const queryString = require('query-string');
const {lingvaTranslate} = require('../schemas')

const WaveFile = require('wavefile').WaveFile;

const arrayBufferToAudioBuffer = require('arraybuffer-to-audiobuffer')

async function getLanguages(request,response,next) {

  try {
    const languages = await axios({
      method: 'get',
      url: 'http://localhost:3000/api/v1/languages?'+ queryString.stringify(request.query)
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}

async function translate(request,response,next) {
  try {
    const validation = validate(request.body,lingvaTranslate)
    if(!validation.valid) {
      return next(new APIError(400, "Bad Request", validation.errors.map(e => e.stack).join('. ')))
    }

    const source = request.body.source
    const target = request.body.target
    const query = request.body.query

    const translation = await axios({
      method: 'get',
      url: 'http://localhost:3000/api/v1/'+source+'/'+target+'/'+query
    })
    return response.status(201).json(translation.data)
  } catch (error) {
    return next(error)
  }
}

async function getAudio(request,response,next) {
  try {
    const lang = request.params.lang
    const query = request.params.query

    const audio = await axios({
      method: 'get',
      url: 'http://localhost:3000/api/v1/audio/'+lang+'/'+query
    })

    return response.status(201).json(audio.data)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getLanguages,
  translate,
  getAudio
}
