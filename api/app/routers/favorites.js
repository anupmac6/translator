const express = require('express')

const { favorites } = require('../handlers')

const router = new express.Router()

const {
addFavorites,
getFavorites,
removeFavoriteById,
isFavorite
} = favorites

router.route("/").get(getFavorites).post(addFavorites);

router.route("/:favoriteId").delete(removeFavoriteById)

router.route("/isFavorite").post(isFavorite)

module.exports = router
