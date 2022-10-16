from flask import Flask,request
from captcha import get_solved_captcha,solve
import comp

 
app = Flask(__name__)
 

@app.route('/captcha',methods=['POST'])
def captcha():
    try:
        request_data = request.get_json()
        try:
            final = get_solved_captcha(request_data['base64'])
            return {'Captcha' : final}
        except:
            return {'Captcha' : 'Not Solved'}
    except:
        return {'Captcha' : 'Wrong Params'}

@app.route('/captchaapi',methods=['POST'])
def apicall():
    try:
        request_data = request.get_json()
        try:
            final = solve(request_data['base64'])
            return {'Captcha' : final["result"]}
        except:
            return {'Captcha' : 'Not Solved'}
    except:
        return {'Captcha' : 'Wrong Params'}

@app.route('/compute',methods=['POST'])
def compute():
    try:
        request_data = request.get_json()
        print(request_data)
        path = request_data['path']
        lang = request_data['language']
        state = request_data['state']
        og_epic = request_data['EPIC']

        family_cards = comp.get_json(path,og_epic,lang)
        print(family_cards)
        return {"People":family_cards}

        
    except Exception as e:
        print(e)
        return {"Input":"Wrong"}

if __name__ == '__main__':
    app.run()