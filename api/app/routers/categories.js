const express = require('express')

const { categories } = require('../handlers')

const router = new express.Router()

const {
  addCategory,
  addTranslationToCategory,
  getCategories,
  getTranslationsByCategory,
  removeById,
  removeTranslationById,
  isInCategory
} = categories;

router
    .route("/")
    .get(getCategories)
    .post(addCategory);

router
    .route("/translations")
    .post(addTranslationToCategory)

router
    .route("/isInCategory")
    .post(isInCategory)

router
    .route("/:categoryId")
    .get(getTranslationsByCategory)
    .delete(removeById)

router
    .route("/:categoryId/:categoryItemId")
    .delete(removeTranslationById)

module.exports = router
