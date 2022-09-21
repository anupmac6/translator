const express = require('express')

const {voiceHandler} = require('../handlers')

const router = new express.Router()
const {getLanguages,getVoices,getAudio} = voiceHandler

router
  .route("/languages")
  .get(getLanguages)

router
  .route("/voices")
  .get(getVoices)

router
  .route("/audio")
  .get(getAudio)

module.exports = router
