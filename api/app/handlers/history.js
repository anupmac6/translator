const { validate } = require("jsonschema");
const { APIError } = require("../helpers");
const { addDoc } = require("firebase/firestore")
const { db } = require("../utils/admin");
const Constants = require("../utils/constants");
const { history,historyItem } = require("../schemas");


async function getHistoryBuckets(request,response,next) {
    try {

          const categoriesRef = db
            .collection("history")
            .doc(Constants.userId)
            .collection("buckets")
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

async function getTranslationsByHistory(request,response,next) {
  try {
    const categoryRef = db
      .collection("history")
      .doc(Constants.userId)
      .collection("buckets")
      .doc(request.params.categoryId)
      .collection("searches")

      const category = await categoryRef.get();

           const data = category.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            return response.status(201).json(data)

  } catch (error) {
    return next(error)
  }
}

async function addTranslationToTranslation(request,response,next) {
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
    const categoriesRef = db
      .collection("history")
      .doc(Constants.userId)
      .collection("buckets")
      .doc(request.body.historyId)
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
        .collection("history")
        .doc(Constants.userId)
        .collection("buckets")
        .doc(request.body.historyId)

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

async function addHistory(request,response,next) {
    const validation = validate(request.body, historyItem);
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

      const bucketName = `${request.body.sourceName} - ${request.body.targetName}`
      // history exists
      const historyRef = await db
        .collection("history")
        .doc(Constants.userId)
        .collection("buckets")
        .where("name","==", bucketName)
        .limit(1)
        .get()


        let bucketId

        if(historyRef.empty){
          // bucket does not exists
          const category = await db
          .collection("history")
          .doc(Constants.userId)
          .collection("buckets")
          .add({
            name: bucketName,
            itemCount: 0,
            createdAt: Date.now(),
          })


          bucketId = category.id
        }
        else {
          bucketId = historyRef.docs?.[0]?.id
        }

        if(bucketId){
          const translation = await db
            .collection("history")
            .doc(Constants.userId)
            .collection("buckets")
            .doc(bucketId)
            .collection("searches")
            .add({
              search: request.body.search,
              sourceLang: request.body.sourceCode,
              targetLang: request.body.targetCode,
              translation: request.body.translation,
              createdAt: Date.now()
            })

            const bucketRef = db
              .collection("history")
              .doc(Constants.userId)
              .collection("buckets")
              .doc(bucketId)

              const bucket = await bucketRef.get()

              if(bucket.exists){
                await bucketRef.update({
                  itemCount: bucket.data().itemCount + 1
                })
              }

            return response.status(201).json({id:translation.id})
        }


        return next(new APIError(400,"Failed to Save History", ""))
    } catch (error) {
        return next(error)
    }
}

module.exports = {
  getHistoryBuckets,
  getTranslationsByHistory,
  addTranslationToTranslation,
  addHistory
};
