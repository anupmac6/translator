const {validate} = require('jsonschema')
const axios = require('axios');
const {APIError} = require('../helpers')
const {translateDetect,translate} = require('../schemas')

async function detectLanguage(request,response,next) {
  const validation = validate(request.body, translateDetect)
  if(!validation.valid) {
    return next( new APIError(400, "Bad Request", validation.errors.map(e => e.stack).join('. ')))
  }

  try {
    const detect = await axios({
      method: 'post',
      url: 'http://localhost:5000/detect',
      data: {
        q: request.body.q
      }
    })
    return response.status(201).json(detect.data)
  } catch (error) {
    return next(error)
  }
}

async function getLanguages(request,response,next) {
  try {
    const languages = await axios({
      method: "get",
      url: "http://localhost:5000/languages"
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}

async function translateText(request,response,next) {
  const validation = validate(request.body,translate)
  if(!validation.valid) {
    return next( new APIError(400, "Bad Request", validation.errors.map(e => e.stack).join('. ')))
  }

  try {
    const detect = await axios({
      method: 'post',
      url: 'http://localhost:5000/translate',
      data: {
        q: request.body.q,
        source: request.body.source,
        target: request.body.target,
        format: request.body.format
      }
    })
    return response.status(201).json(detect.data)
  } catch (error) {
    return next(error)
  }
}

async function getSettings(request,response,next) {
  try {
    const languages = await axios({
      method: "get",
      url: "http://localhost:5000/frontend/settings"
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  detectLanguage,
  getLanguages,
  translateText,
  getSettings
}
