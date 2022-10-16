import pytesseract
import cv2
import matplotlib.pyplot as plt
import numpy as np
import io
import base64
import requests

from PIL import Image


def get_solved_captcha(base64_string):
    imgObj = Image.open(io.BytesIO(base64.b64decode(base64_string)))
    img = cv2.cvtColor(np.array(imgObj), cv2.COLOR_BGR2RGB)
    img =  img[5:5+122, 5:5+105]
    image = cv2.copyMakeBorder(img , 0, 0, 100, 100, cv2.BORDER_CONSTANT, value=[255, 255, 255])
    image[image < 170] = 0

    pyt = pytesseract.image_to_string(image, lang='eng')
    sep = '\n'
    captcha= pyt.split(sep, 1)[0]

    return captcha

def solve(buff):

    #encoded_string = base64.b64encode(buffer).decode('ascii')
    url = 'https://api.apitruecaptcha.org/one/gettext'

    data = { 
        'userid':'gamefun1232@gmail.com', 
        'apikey':'exRGleCZLK7jtWCLl4mM',  
        'data':buff
    }
    response = requests.post(url = url, json = data)
    data = response.json()
    return data