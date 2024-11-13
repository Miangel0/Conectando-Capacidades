from flask import Flask, request, jsonify, send_from_directory

import cv2
import numpy as np
from PIL import Image
import io
from main import predict_sign_from_frame

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')


# Endpoint para procesar cuadros de video
@app.route('/process_frame', methods=['POST'])
def process_frame():
    # Leer el cuadro en formato de imagen desde la solicitud
    file = request.files['frame'].read()
    img = Image.open(io.BytesIO(file))
    frame = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    
    # Realizar predicción de señas en el cuadro
    prediction = predict_sign_from_frame(frame)
    
    # Respuesta JSON con el resultado de la predicción
    if prediction:
        return jsonify({"prediction": prediction})
    else:
        return jsonify({"prediction": None})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
