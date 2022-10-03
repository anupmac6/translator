const express = require('express')

const { categories } = require('../handlers')

const router = new express.Router()

const { addCategory,addTranslationToCategory,getCategories,getTranslationsByCategory} = categories;

router
    .route("/")
    .get(getCategories)
    .post(addCategory);

router
    .route("/translations")
    .post(addTranslationToCategory)
router
    .route("/:categoryId")
    .get(getTranslationsByCategory)

module.exports = router
