const express = require("express")

const {lingvaHandler} = require('../handlers')

const router = new express.Router()
const {getLanguages,translate,getAudio} = lingvaHandler

router
  .route('/languages')
  .get(getLanguages)

router
  .route('/translate')
  .post(translate)

router
  .route('/audio/:lang/:query')
  .get(getAudio)

module.exports = router
