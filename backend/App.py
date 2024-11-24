from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import cv2
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

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

@app.route('/process_frame', methods=['POST'])
def process_frame_endpoint():
    global kp_seq
    file = request.files['frame'].read()
    img = Image.open(io.BytesIO(file))
    frame = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

    # Llamar a la función de predicción
    prediction, kp_seq = predict_sign_from_frame(frame, kp_seq)

    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(port=3000, debug=True)