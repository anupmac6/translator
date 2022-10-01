const { validate } = require("jsonschema");
const { APIError } = require("../helpers");
const { db } = require("../utils/admin");
const Constants = require("../utils/constants");
const { recentLanguages } = require("../schemas");

async function getRecentLanguages(request,response,next) {
    const recentLangRef = db.collection('recentLangs').doc(Constants.userId)

    try {
        const recentLangs = await recentLangRef.get();
        if(recentLangs.exists){
            const languagesRef = recentLangRef
              .collection("languages")
              .orderBy("createdAt", "desc")
              .limit(2)

            const languages = await languagesRef.get();

            const data = languages.docs.map((doc) => (doc.data()));
            return response.status(201).json(data)
        }
        return response.status(201).json(null)
    } catch (error) {
        return next(error)
    }
}

async function addRecentLanguage(request,response,next) {

    const validation = validate(request.body,recentLanguages)
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

    const recentLangRef = db
      .collection("recentLangs")
      .doc(Constants.userId)
      .collection("languages").doc()

      const recentLang = await recentLangRef.create({
        ...request.body,
        createdAt: Date.now()
      })

      return response.status(201).json(recentLang)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getRecentLanguages,
    addRecentLanguage
}
