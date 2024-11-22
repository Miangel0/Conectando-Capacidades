from flask import Flask, render_template, Response
import cv2
from flask_socketio import SocketIO
from evaluate_model import normalize_keypoints
from helpers import *
import base64
from keras.models import load_model
from mediapipe.python.solutions.holistic import Holistic
from constants import *
import numpy as np

app = Flask(__name__)
socketio = SocketIO(app)

# Variables globales y configuración del modelo
threshold = 0.8
margin_frame = 1
delay_frames = 3

# Cargar el modelo y las palabras



@app.route("/")
def index():
    return render_template("index.html")

@socketio.on('send_frame')
def evaluate_model(frame_data):
    fix_frames = 0
    recording = False
    kp_seq, sentence = [], []
    count_frame = 0
    model = load_model(MODEL_PATH)
    word_ids = get_word_ids(WORDS_JSON_PATH)
    # Decodificar el frame desde Base64
    frame_data = frame_data.split(",")[1]
    img_data = base64.b64decode(frame_data)
    np_arr = np.frombuffer(img_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Procesar frame con MediaPipe
    with Holistic() as holistic_model:  # Inicialización de Holistic (puedes optimizar esto)
        results = mediapipe_detection(frame, holistic_model)

        # Si se detecta una mano o estamos grabando
        if there_hand(results) or recording:
            recording = False
            count_frame += 1
            if count_frame > margin_frame:
                kp_frame = extract_keypoints(results)
                kp_seq.append(kp_frame)
        else:
            # Si se cumplen los requisitos para analizar una secuencia
            if count_frame >= MIN_LENGTH_FRAMES + margin_frame:
                fix_frames += 1
                if fix_frames < delay_frames:
                    recording = True
                    return  # Continuar capturando frames

                # Normalizar y predecir con el modelo
                kp_seq = kp_seq[: -(margin_frame + delay_frames)]
                kp_normalized = normalize_keypoints(kp_seq, int(MODEL_FRAMES))
                res = model.predict(np.expand_dims(kp_normalized, axis=0))[0]

                if res[np.argmax(res)] > threshold:
                    word_id = word_ids[np.argmax(res)].split('-')[0]
                    sent = words_text.get(word_id)
                    print(sent)
                    
                    # Emitir el resultado al frontend
                    socketio.emit('receive_result', {'result': sent})

                # Resetear las variables de la secuencia
                recording = False
                fix_frames = 0
                count_frame = 0
                kp_seq = []

if __name__ == '__main__':
    socketio.run(app, debug=True)