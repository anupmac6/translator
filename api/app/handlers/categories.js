const { validate } = require("jsonschema");
const { APIError } = require("../helpers");
const { db } = require("../utils/admin");
const Constants = require("../utils/constants");
const { category,categoryTranslations } = require("../schemas");


async function getCategories(request,response,next) {
    try {

          const categoriesRef = db
            .collection("list")
            .doc(Constants.userId)
            .collection("categories")
            .orderBy("createdAt", "desc")
            .limit(20);

          const categories = await categoriesRef.get();

          const data = categories.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return response.status(201).json(data);

    } catch (error) {
        return next(error)
    }
}

async function getTranslationsByCategory(request,response,next) {
  try {
    const categoryRef = db
      .collection("list")
      .doc(Constants.userId)
      .collection("categories")
      .doc(request.params.categoryId)
      .collection("searches")

      const category = await categoryRef.get();

           const data = category.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            return response.status(201).json(data)

  } catch (error) {
    return next(error)
  }
}

async function removeTranslationById(request,response,next) {
  try {
    await db
      .collection("list")
      .doc(Constants.userId)
      .collection("categories")
      .doc(request.params.categoryId)
      .collection("searches")
      .doc(request.params.categoryItemId)
      .delete()

      const categoryRef = db
        .collection("list")
        .doc(Constants.userId)
        .collection("categories")
        .doc(request.params.categoryId)

        const category = await categoryRef.get()

        if(category.exists){
          const itemCount = category.data().itemCount

          await categoryRef.update({
            itemCount: itemCount > 0 ? itemCount - 1 : itemCount
          })
        }

      return response.status(201).json(true)
  } catch (error) {
    return next(error)
  }
}

async function removeById(request,response,next) {
  try {
    await db
    .collection("list")
    .doc(Constants.userId)
    .collection("categories")
    .doc(request.params.categoryId)
    .delete()

    return response.status(201).json(true)
  } catch (error) {
    return next(error)
  }
}

async function addTranslationToCategory(request,response,next) {
   const validation = validate(request.body, categoryTranslations);
   if (!validation.valid) {
     return next(
       new APIError(
         400,
         "Bad Request",
         validation.errors.map((e) => e.stack).join(". ")
       )
     );
   }

   try {
    const categoriesRef = db
      .collection("list")
      .doc(Constants.userId)
      .collection("categories")
      .doc(request.body.categoryId)
      .collection("searches")
      .doc()

      const translation = await categoriesRef.create({
        search: request.body.search,
        sourceLang: request.body.sourceLang,
        targetLang: request.body.targetLang,
        translation: request.body.translation,
        createdAt: Date.now()
      })

      const categoryRef = db
        .collection("list")
        .doc(Constants.userId)
        .collection("categories")
        .doc(request.body.categoryId)

        const category = await categoryRef.get()

        if(category.exists){
          await categoryRef.update({
            itemCount: category.data().itemCount + 1
          })
        }
      return response.status(201).json(translation)
   } catch (error) {
    return next(error)
   }
}

async function addCategory(request,response,next) {
    const validation = validate(request.body, category);
    if (!validation.valid) {
      return next(
        new APIError(
          400,
          "Bad Request",
          validation.errors.map((e) => e.stack).join(". ")
        )
      );
    }

    try {
        const categoryRef = db
          .collection("list")
          .doc(Constants.userId)
          .collection("categories")
          .doc();

        const category = await categoryRef.create({
          ...request.body,
          itemCount: 0,
          createdAt: Date.now(),
        });

        return response.status(201).json(category);
    } catch (error) {
        return next(error)
    }
}

module.exports = {
  getCategories,
  addCategory,
  addTranslationToCategory,
  getTranslationsByCategory,
  removeById,
  removeTranslationById
};
