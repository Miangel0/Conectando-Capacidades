import os 
from flask import Flask, request
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Conectando Capacidades'

@app.route('/upload_video', methods=['POST'])
def upload_video():
    video_file = request.files['video']
    file_name = secure_filename(video_file.filename)
    root_path = os.path.dirname(os.path.abspath(__file__))
    tmp_file = os.path.join(root_path, 'tmp', file_name)
    video_file.save(tmp_file)
    
    
    
    
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=500, debug=True)