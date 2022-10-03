const express = require('express')

const { history } = require('../handlers')

const router = new express.Router()

const {
  getHistoryBuckets,
  getTranslationsByHistory,
  addTranslationToTranslation,
  addHistory
} = history


router
    .route("/")
    .get(getHistoryBuckets)
    .post(addHistory);

router
    .route("/translations")
    .post(addTranslationToTranslation)
router
    .route("/:categoryId")
    .get(getTranslationsByHistory)

module.exports = router
