from flask import Flask, render_template, request, redirect, url_for
import pickle
import string
import nltk
from nltk.stem import PorterStemmer

app = Flask(__name__)

ps = PorterStemmer()
tfidf = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))

nltk.download('punkt')

def transform_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)

    y = []
    for i in text:
        if i.isalnum():
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        if i not in string.punctuation:
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        y.append(ps.stem(i))

    return " ".join(y)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_sms = request.form.get('message')
    transformed_sms = transform_text(input_sms)
    vector_input = tfidf.transform([transformed_sms])
    result = model.predict(vector_input)[0]
    if result == 1:
        prediction = "Spam"
    else:
        prediction = "Not Spam"
    return render_template('result.html', prediction=prediction)

@app.route('/signin')
def signin():
    return render_template('signin.html')

@app.route('/signup')
def signout():
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)