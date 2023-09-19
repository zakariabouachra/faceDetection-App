from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import numpy as np
from pymongo import MongoClient
from datetime import datetime
import requests
import cv2

app = Flask(__name__)
CORS(app)

# Load signatures
signatures_original = np.load('Signatures.npy')
signatures = signatures_original[:, 0:-1].astype('float')
names = signatures_original[:, -1]

@app.route('/process', methods=['POST'])
def process_image():
    # Get the image from the request
    image_file = request.files['image']

    image = face_recognition.load_image_file(image_file)

    # Process the image with face recognition
    encodings = face_recognition.face_encodings(image)
    if len(encodings) > 0:
        encoding = encodings[0]
        matches = face_recognition.compare_faces(signatures, encoding)
        face_distances = face_recognition.face_distance(signatures, encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = names[best_match_index].upper()
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            try:
                response = requests.post('http://localhost:3000/checkPresence', json={"name": name, "timestamp": timestamp}, timeout=5)
                data = {
                    'presence': response.text,
                    'name': name,
                    'timestamp': timestamp
                }
                print(data)
                return jsonify(data)
            except requests.RequestException as e:
                print(f"Error sending request: {e}")
        else:
            return jsonify({"result": "Unknown person"})
    else:
        return jsonify({"result": "No face detected"})

if __name__ == '__main__':
    app.run(port=5000)
