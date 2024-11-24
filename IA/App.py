from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import base64
import io
from PIL import Image
import numpy as np
from server import predict_sign_from_frame

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode='eventlet')

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def test_connect():
    print('Client connected')

@socketio.on('frame')
def handle_frame(frame_data):
    
    image_data = base64.b64decode(frame_data.split(',')[1])
    image = Image.open(io.BytesIO(image_data))
    image_np = np.array(image)
    
    word = predict_sign_from_frame(image_np)
    emit('word', word)

if __name__ == '__main__':
    socketio.run(app, debug=True)