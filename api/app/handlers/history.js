const { validate } = require("jsonschema");
const { APIError } = require("../helpers");
const { db } = require("../utils/admin");
const Constants = require("../utils/constants");
const { history } = require("../schemas");


async function getSearchHistory(request,response,next) {
    try {
        const historyRef = db.collection('history').doc(Constants.userId)

        const history = await historyRef.get()

        if(history.exists){
            const searchesRef = historyRef
                .collection("searches")
                .orderBy("createdAt","desc")
                .limit(20)

            const searches = await searchesRef.get()

            const data = searches.docs.map((doc) => doc.data())
            return response.status(201).json(data)
        }
        return response.status(201).json([])
    } catch (error) {
        return next(error)
    }
}

async function addSearchHistory(request,response,next) {
    const validation = validate(request.body, history);
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
        const historyRef = db.collection("history").doc(Constants.userId).collection("searches").doc()

        const search = await historyRef.create({
            ...request.body,
            createdAt: Date.now()
        })

        return response.status(201).json(search)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getSearchHistory,
    addSearchHistory
}
