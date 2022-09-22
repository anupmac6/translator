const express = require('express')

const {imageHandler} = require('../handlers')

const router = new express.Router()
const {getLanguages,getImageBox,getImageData,getImageOsd,getImageString,getImageXml} = imageHandler

router
  .route("/languages")
  .get(getLanguages)

router
  .route("/box")
  .get(getImageBox)

router
  .route("/data")
  .get(getImageData)

router
  .route("/osd")
  .get(getImageOsd)

router
  .route("/string")
  .get(getImageString)

router
  .route("/xml")
  .get(getImageXml)

module.exports = router
