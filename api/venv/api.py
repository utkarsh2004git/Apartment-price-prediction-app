from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import pickle
import os

app = Flask(__name__)

CORS(app)

# logging.basicConfig(level=logging.INFO)
model_path = os.path.join(os.path.dirname(__file__), 'model_Creation', 'BoostingModel.pkl')

with open(model_path, 'rb') as f:
    model = pickle.load(f)

@app.route('/submit', methods=['POST'])
def submit():
    logging.info(f"Received request: {request.json}")
    
    data = request.get_json()

    state = data.get('state')
    city = data.get('city')
    locality = data.get('locality')
    BHK = data.get('BHK')
    LATITUDE = data.get('LATITUDE')
    LONGITUDE = data.get('LONGITUDE')
    postedBy = int( data.get('postedBy'))
    ready_to_move = int(data.get('ready_to_move'))
    rera = int(data.get('rera'))
    resale = int(data.get('resale'))
    size = float(data.get('size'))
    underConstruction = int(data.get('underConstruction'))
    


    bhkNo =int( BHK[0:1])
    bhkOrRk = 1 if BHK[1:]=="BHK" else 2

    input_data=[postedBy,underConstruction,rera,bhkNo,bhkOrRk,size,ready_to_move,resale,LONGITUDE,LATITUDE]
    predicted_price = model.predict([input_data])

    return jsonify({
        'message': 'Data received successfully',
        'predicted_price': predicted_price[0]
    })

if __name__ == '__main__':
    app.run(debug=True)
