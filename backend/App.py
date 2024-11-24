from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import cv2
import numpy as np
from PIL import Image
import io
from flask_sock import Sock
from IA.server import predict_sign_from_frame
from IA.helpers import *
from IA.constants import *



app = Flask(__name__)
sock = Sock(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Trompo12'
app.config['MYSQL_DB'] = 'conectando'
mysql = MySQL(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add_user", methods=['POST'])
def add_user():
    if request.method == 'POST':
        nombres = request.form['nombres']
        apellidos = request.form['apellidos']
        correo = request.form['correo']
        rol = request.form['rol']
        facultad = request.form['facultad']
        pregrado = request.form['pregrado']
        discapacidad = request.form['discapacidad']
        password = request.form['password']
        
        cur = mysql.connection.cursor()
        query = """
        INSERT INTO users(first_name, last_name, email, password, role, faculty, undergraduate_program, disability)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cur.execute(query, (nombres, apellidos, correo, password, rol, facultad, pregrado, discapacidad))
        mysql.connection.commit()
        return('Ha sido ingresado exitosamente')

@sock.route('/process_frame')
def process_frame_ws(ws):
    global kp_seq

    while True:
        # Recibir el frame en formato binario
        frame_data = ws.receive()
        if frame_data is None:
            break

        # Convertir frame binario a imagen y luego a numpy array
        img = Image.open(io.BytesIO(frame_data))
        frame = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

        # Procesar el frame con el modelo
        prediction, kp_seq = predict_sign_from_frame(frame, kp_seq)
        
        # Enviar la predicción de vuelta al cliente
        ws.send(json.dumps({"prediction": prediction}))

if __name__ == "__main__":
    app.run(port=3000, debug=True)