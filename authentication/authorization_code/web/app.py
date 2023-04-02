import speech_recognition as sr

def recognize_speech():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Say something!")
        audio = r.listen(source)

    try:
        recognized_text = r.recognize_google(audio)
        return recognized_text
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))

from flask import Flask, request

app = Flask(__name__)

@app.route('/recognize_speech', methods=['POST'])
def recognize_speech():
    recognized_text = recognize_speech()
    return recognized_text

if __name__ == '__main__':
    app.run(debug=True)
