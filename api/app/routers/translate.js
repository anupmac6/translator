const express = require("express")

const {translateHandler} = require("../handlers")

const router = new express.Router()
const {detectLanguage,getLanguages,translateText,getSettings} = translateHandler

router
  .route("/detect")
  .post(detectLanguage)

router
  .route("/languages")
  .get(getLanguages)

router
  .route("/text")
  .post(translateText)

router
  .route("/settings")
  .get(getSettings)

module.exports = router
