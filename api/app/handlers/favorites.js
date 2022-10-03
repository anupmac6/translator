const { validate } = require("jsonschema");
const { APIError } = require("../helpers");
const { db } = require("../utils/admin");
const Constants = require("../utils/constants");
const { favorites } = require("../schemas");


async function getFavorites(request,response,next) {
    try {

          const searchesRef = db
            .collection("favorites")
            .doc(Constants.userId)
            .collection("searches")
            .orderBy("createdAt", "desc")
            .limit(20);

          const searches = await searchesRef.get();

          const data = searches.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          return response.status(201).json(data);

    } catch (error) {
        return next(error)
    }
}

async function addFavorites(request,response,next) {
    const validation = validate(request.body, favorites);
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
        const recentsRef = await db
          .collection("favorites")
          .doc(Constants.userId)
          .collection("searches")
          .add({
            search: request.body.search.trim(),
            sourceLang:request.body.sourceLang,
            targetLang: request.body.targetLang,
            translation: request.body.translation.trim(),
            createdAt: Date.now(),
          })

        return response.status(201).json({id: recentsRef.id})
    } catch (error) {
        return next(error)
    }
}

async function isFavorite(request,response,next) {
  const validation = validate(request.body, favorites);
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
      const favoriteRef = await db
        .collection("favorites")
        .doc(Constants.userId)
        .collection("searches")
        .where("search","==",request.body.search.trim())
        .where("sourceLang","==",request.body.sourceLang)
        .where("targetLang","==",request.body.targetLang)
        .where("translation","==",request.body.translation.trim())
        .get()

        return response.status(201).json(!favoriteRef.empty)
    } catch (error) {
return next(error)
    }
}

async function removeFavoriteById(request,response,next){
  try {
    await db
      .collection("favorites")
      .doc(Constants.userId)
      .collection("searches")
      .doc(request.params.favoriteId)
      .delete()

      return response.status(201).json(true)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getFavorites,
  addFavorites,
  removeFavoriteById,
  isFavorite
};
