const {validate} = require("jsonschema")
const axios = require('axios');
const { APIError } = require("../helpers")


async function getLanguages(request,response,next) {
  try {
    const languages = await axios({
      method: "get",
      url: "http://localhost:5001/languages"
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}

async function getImageString(request,response,next) {
  try {
    const languages = await axios({
      method: "get",
      url: "http://localhost:5001/image-string"
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}

async function getImageBox(request,response,next) {
  try {
    const languages = await axios({
      method: "get",
      url: "http://localhost:5001/image-box"
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}

async function getImageData(request,response,next) {
  try {
    const res = await axios({
      method: "get",
      url: "http://localhost:5001/image-data"
    })

    const imageData = res.data

    const splitByLines = imageData.split('\n')

    const items = splitByLines.map((line,index) => {
      const splitByTab = line.split('\t')
      if(index !== 0 ){
        const level = splitByTab[0]

        /**
         * LEVEL
         * 1 page
           2 block
           3 paragraph
           4 line
           5 word.
         *
         */

        const pageNum = splitByTab[1]
        const blockNum = splitByTab[2]
        const paragraphNum = splitByTab[3]
        const lineNum = splitByTab[4]
        const wordNum = splitByTab[5]
        const left = splitByTab[6]
        const top = splitByTab[7]
        const width = splitByTab[8]
        const height = splitByTab[9]
        const confidence = splitByTab[10]
        const text = splitByTab[11]

        if(text === ""){
          return null
        }

        if(confidence < 30) {
          return null
        }

        const obj = {
          level,
          pageNum,
          blockNum,
          paragraphNum,
          lineNum,
          wordNum,
          left,
          top,
          width,
          height,
          confidence,
          text
        }
        return obj
      }
    })

    // remove null
    const list = items.filter(item => !!item)

    const paragraphs = []

    list.forEach(listItem => {

      if(!listItem.text || !listItem.text.trim()){
        return;
      }


      const paragraphIndex = paragraphs.findIndex(item => item.paragraphNumber === listItem.paragraphNum)

      if(paragraphIndex === -1){
        // new para
        paragraphs.push({
          paragraphNumber: listItem.paragraphNum,
          lines: [
            {
              number: listItem.lineNum,
              words: [listItem.text]
            }
          ]
        })
      }
      else {
        // existing para
        const lineIndex = paragraphs[paragraphIndex].lines.findIndex(line => line.number === listItem.lineNum)

        if(lineIndex === -1){
          // new line
          paragraphs[paragraphIndex].lines.push({
            number: listItem.lineNum,
            words: [listItem.text]
          })
        }
        else{
          // existing line
          paragraphs[paragraphIndex].lines[lineIndex].words.push(listItem.text)
        }
      }

    })

    return response.status(201).json(paragraphs)
  } catch (error) {
    return next(error)
  }
}

async function getImageOsd(request,response,next) {
  try {
    const languages = await axios({
      method: "get",
      url: "http://localhost:5001/image-osd"
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}

async function getImageXml(request,response,next) {
  try {
    const languages = await axios({
      method: "get",
      url: "http://localhost:5001/image-xml"
    })
    return response.status(201).json(languages.data)
  } catch (error) {
    return next(error)
  }
}


module.exports = {
  getLanguages,
  getImageString,
  getImageBox,
  getImageData,
  getImageOsd,
  getImageXml
}
