const express = require('express')

const { categories } = require('../handlers')

const router = new express.Router()

const {
  addCategory,
  addTranslationToCategory,
  getCategories,
  getTranslationsByCategory,
  removeById,
  removeTranslationById

} = categories;

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
    .delete(removeById)

router
    .route("/:categoryId/:categoryItemId")
    .delete(removeTranslationById)

module.exports = router
