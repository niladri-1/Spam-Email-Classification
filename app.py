from flask import Flask, render_template, request, redirect, url_for, session, flash
import pickle
import string
import nltk
from nltk.stem import PorterStemmer
import mysql.connector



app = Flask(__name__)
app.secret_key = '1c8073775dbc85a92ce20ebd44fd6a4fd832078f59ef16ec'  # Replace with a secure secret key

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



@app.route('/signup', methods=['GET'])
def signup():
    return render_template('signup.html')

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="@2001",
    database="smc"
)

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        full_name = request.form['full_name']
        username = request.form['username']
        email = request.form['email']
        phone = request.form['phone']
        password = request.form['password']

        # Ensure the password and confirm_password match
        confirm_password = request.form['confirm_password']
        if password != confirm_password:
            return "Password and Confirm Password do not match."

        # Insert data into MySQL
        cur = db.cursor()
        cur.execute("INSERT INTO users (full_name, username, email, phone, password) VALUES (%s, %s, %s, %s, %s)",
                    (full_name, username, email, phone, password))
        db.commit()
        cur.close()

        flash('Registration successful', 'success')
        return redirect('/signin')

    return "Invalid request method"


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # Query the database to check if the email and password match
        cur = db.cursor()
        cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        user = cur.fetchone()
        cur.close()

        if user:
            # Successful login, you can store user session or redirect to a different page
            # For example, you can set a session variable to remember the user's login state
            return render_template('index.html')
        else:
            return "Login failed. Check your email and password."

    return "Invalid request method"


if __name__ == '__main__':
    app.run(debug=True)