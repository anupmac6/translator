const express = require('express')

const { recents } = require('../handlers')

const router = new express.Router()

const {
addRecents,
getRecents
} = recents

router.route("/").get(getRecents).post(addRecents);

module.exports = router
