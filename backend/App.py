from flask import Flask, request, Response
from flask_mysqldb import MySQL
from flask_cors import CORS
from server import evaluate_model


app = Flask(__name__)
CORS(app) 

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Trompo12'
app.config['MYSQL_DB'] = 'conectando'
mysql = MySQL(app)

@app.route("/add_user", methods=['POST'])
def add_user():
    try:
        data = request.json  # Leer datos JSON enviados por el cliente
        nombres = data.get('nombres')
        apellidos = data.get('apellidos')
        correo = data.get('correo')
        rol = data.get('rol')
        discapacidad = data.get('discapacidad')
        password = data.get('password')

        # Verificar campos obligatorios
        if not all([nombres, apellidos, correo, rol, password]):
            return {"error": "Faltan campos obligatorios."}, 400

        # Inserción en la base de datos
        cur = mysql.connection.cursor()
        query = """
        INSERT INTO users (first_name, last_name, email, password, role, disability)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cur.execute(query, (nombres, apellidos, correo, password, rol, discapacidad))
        mysql.connection.commit()

        return {"message": "Usuario registrado con éxito."}, 201  # Respuesta exitosa
    except Exception as e:
        print("Error en /add_user:", e)
        return {"error": "Error interno del servidor."}, 500

@app.route("/login", methods=['POST'])
def login():
    try:
        data = request.json  # Recibir datos JSON
        correo = data.get('correo')
        password = data.get('password')

        # Verificar si el correo y la contraseña son proporcionados
        if not correo or not password:
            return {"error": "Correo y contraseña son requeridos."}, 400

        # Consultar el usuario en la base de datos
        cur = mysql.connection.cursor()
        query = "SELECT * FROM users WHERE email = %s"
        cur.execute(query, (correo,))
        user = cur.fetchone()

        if user:
            # Si el usuario existe, verificar la contraseña (aquí puedes usar un hash en vez de comparar texto plano)
            if user[4] == password:  # Suponiendo que la contraseña está en la columna 3 (ajusta según tu estructura)
                return {"message": "Login exitoso", "user_id": user[0]}, 200  # 200 OK
            else:
                return {"error": "Contraseña incorrecta."}, 400
        else:
            return {"error": "Usuario no encontrado."}, 400

    except Exception as e:
        print(f"Error en /login: {e}")
        return {"error": "Error interno del servidor."}, 500

@app.route("/video_feed")
def video_feed(): 
    return Response(evaluate_model(),
                    mimetype="multipart/x-mixed-replace; boundary=frame")

if __name__ == "__main__":
    app.run(port=3000, debug=True)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
