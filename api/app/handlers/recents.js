const { validate } = require("jsonschema");
const { APIError } = require("../helpers");
const { db } = require("../utils/admin");
const Constants = require("../utils/constants");
const { recents } = require("../schemas");


async function getRecents(request,response,next) {
    try {

          const searchesRef = db
            .collection("recents")
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

async function addRecents(request,response,next) {
    const validation = validate(request.body, recents);
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
        const recentsRef = db
          .collection("recents")
          .doc(Constants.userId)
          .collection("searches")
          .doc();

        const search = await recentsRef.create({
          ...request.body,
          createdAt: Date.now(),
        });

        return response.status(201).json(search)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
  getRecents,
  addRecents,
};
