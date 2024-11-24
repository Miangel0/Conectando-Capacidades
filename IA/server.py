from keras.models import load_model
from helpers import *
from constants import *
import numpy as np
from mediapipe.python.solutions.holistic import Holistic
from evaluate_model import normalize_keypoints

# Cargar modelo y configuraciones
word_ids = get_word_ids(WORDS_JSON_PATH)
model = load_model(MODEL_PATH)

def process_frame(frame, kp_seq, threshold=0.8, margin_frame=1, delay_frames=3):
    """
    Procesa un único frame y devuelve una predicción si aplica.

    Args:
        frame: Un frame capturado (numpy array).
        kp_seq: Secuencia acumulada de puntos clave (*keypoints*).
        threshold: Umbral de confianza para clasificar una seña.
        margin_frame: Margen de frames requeridos para procesar una seña.
        delay_frames: Frames a ignorar después de procesar una seña.

    Returns:
        - La predicción del modelo (si aplica).
        - La secuencia actualizada de puntos clave (*keypoints*).
    """
    sentence = []
    recording = len(kp_seq) > 0
    fix_frames = 0
    count_frame = len(kp_seq)

    with Holistic() as holistic_model:
        # Detectar puntos clave con Mediapipe
        results = mediapipe_detection(frame, holistic_model)

        # Verificar si hay actividad de las manos
        if there_hand(results) or recording:
            recording = False
            count_frame += 1
            if count_frame > margin_frame:
                kp_frame = extract_keypoints(results)
                kp_seq.append(kp_frame)

        else:
            if count_frame >= MIN_LENGTH_FRAMES + margin_frame:
                fix_frames += 1
                if fix_frames < delay_frames:
                    recording = True
                else:
                    kp_seq = kp_seq[: - (margin_frame + delay_frames)]
                    kp_normalized = normalize_keypoints(kp_seq, int(MODEL_FRAMES))
                    res = model.predict(np.expand_dims(kp_normalized, axis=0))[0]

                    # Evaluar predicción según el umbral
                    if res[np.argmax(res)] > threshold:
                        word_id = word_ids[np.argmax(res)].split('-')[0]
                        sentence.append(words_text.get(word_id))

                # Reiniciar después de procesar una seña
                kp_seq.clear()

    return sentence, kp_seq

# Ejemplo: Proceso desde servicio web
def predict_sign_from_frame(frame, kp_seq):
    """
    Predice la seña basada en un solo frame y una secuencia de puntos clave.

    Args:
        frame: Frame recibido desde el cliente web.
        kp_seq: Secuencia acumulada de puntos clave (*keypoints*).

    Returns:
        - Predicción como texto (si aplica).
        - Secuencia actualizada de puntos clave (*keypoints*).
    """
    sentence, updated_kp_seq = process_frame(frame, kp_seq)
    return ' '.join(sentence), updated_kp_seq
