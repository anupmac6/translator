const express = require("express")

const { settingsHandler } = require("../handlers")

const router = new express.Router()
const {
    getSettings,
    updateSettings
} = settingsHandler

router
    .route("/")
    .get(getSettings)
    .post(updateSettings)

module.exports = router
