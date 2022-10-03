const express = require('express')

const { history } = require('../handlers')

const router = new express.Router()

const {
getSearchHistory,
addSearchHistory
} = history

router
    .route("/")
    .get(getSearchHistory)
    .post(addSearchHistory)

module.exports = router
