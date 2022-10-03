const express = require('express')

const { favorites } = require('../handlers')

const router = new express.Router()

const {
addFavorites,
getFavorites
} = favorites

router.route("/").get(getFavorites).post(addFavorites);

module.exports = router
