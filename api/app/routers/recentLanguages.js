const express = require("express")

const { recentLanguages } = require("../handlers")

const router = new express.Router()
const {
    getRecentLanguages,
    addRecentLanguage
} = recentLanguages

router
    .route("/")
    .get(getRecentLanguages)
    .post(addRecentLanguage)

module.exports = router
