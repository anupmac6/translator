const {validate} = require('jsonschema')
const {APIError} = require("../helpers")
const { db } = require('../utils/admin')
const Constants = require('../utils/constants')
const {settings} = require('../schemas')

async function getSettings(request,response,next) {
    const settingsRef = db.collection('settings').doc(Constants.userId)
    try {
        const settings = await settingsRef.get();
        if (settings.exists) {
          return response.status(201).json(settings.data());
        }
        const createdSettings = {
          showOnboarding: false,
          targetLang: "es",
          sourceLang: "en",
        };

        await settingsRef.set(createdSettings)
        return response.status(201).json(createdSettings)
    } catch (error) {
        return next(error)
    }
}

async function updateSettings(request,response,next) {
    const validation = validate(request.body, settings)
    if(!validation.valid) {
        return next(new APIError(400,"Bad Request", validation.errors.map(e => e.stack).join('. ')))
    }

    try {
        const settingsRef = db.collection('settings').doc(Constants.userId)
        const data  = await settingsRef.update(request.body)
        return response.status(201).json(data)
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    getSettings,
    updateSettings
}
