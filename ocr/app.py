#!/usr/bin/env python3
from flask import Flask, render_template, request,jsonify
from werkzeug import secure_filename
import os
import sys
from PIL import Image
import pytesseract
import argparse
import cv2

__author__ = 'Rick Torzynski <ricktorzynski@gmail.com>'
__source__ = ''

app = Flask(__name__)
UPLOAD_FOLDER = './static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER 
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/languages")
def getLanguages():
  languages = pytesseract.get_languages()
  return jsonify(languages)


@app.route("/image-string")
def imageToString():
  data = pytesseract.image_to_string(Image.open('tests/test.jpg'))
  return jsonify(data)

@app.route("/image-box")
def imageToBox():
  data = pytesseract.image_to_boxes(Image.open('tests/test.jpg'))
  return jsonify(data)

@app.route("/image-data")
def imageToData():
  data = pytesseract.image_to_data(Image.open('tests/test.jpg'))
  return jsonify(data)

@app.route("/image-osd")
def imageToOsd():
  data = pytesseract.image_to_osd(Image.open('tests/test.jpg'))
  return jsonify(data)

@app.route("/image-xml")
def imageToXml():
  data = pytesseract.image_to_alto_xml(Image.open('tests/test.jpg'))
  return jsonify(data)

@app.route("/image-hindi")
def imageToHindi():
  data = pytesseract.image_to_string(Image.open('tests/n3toR.png'), lang='hin')
  return jsonify(data)

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']

      # create a secure filename
      filename = secure_filename(f.filename)

      # save file to /static/uploads
      filepath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
      f.save(filepath)
      
      # load the example image and convert it to grayscale
      image = cv2.imread(filepath)
      gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
      
      # apply thresholding to preprocess the image
      gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

      # apply median blurring to remove any blurring
      gray = cv2.medianBlur(gray, 3)

      # save the processed image in the /static/uploads directory
      ofilename = os.path.join(app.config['UPLOAD_FOLDER'],"{}.png".format(os.getpid()))
      cv2.imwrite(ofilename, gray)
      
      # perform OCR on the processed image
      text = pytesseract.image_to_string(Image.open(ofilename))
      
      # remove the processed image
      os.remove(ofilename)

      return jsonify({'text': text})

if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5001))
  app.run(debug=True, host='0.0.0.0', port=port)
  # app.run(host="0.0.0.0", port=5000, debug=True)
