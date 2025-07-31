from flask import Flask, request, jsonify
import whisper

app = Flask(__name__)
model = whisper.load_model("base")  # Load the Whisper model

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    audio = request.files['file']
    audio.save('temp_audio.wav')  # Save the uploaded file temporarily

    result = model.transcribe('temp_audio.wav', verbose=False)  # Transcribe the audio file

    segments = result.get('segments', [])
    simplified = [
        {
            "start": round(s["start"], 2),
            "end": round(s["end"], 2),
            "text": s["text"].strip()
        }
        for s in segments
    ]

    return jsonify({"transcript": simplified})