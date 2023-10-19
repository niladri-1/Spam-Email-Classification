# Spam Mail Classification

## Description

The Spam Mail Classification project is a web-based application that uses machine learning to classify emails as spam or ham. It features a Flask backend, a frontend created with HTML, CSS, and JavaScript, and a MySQL database for storing user data and email classifications.

## Features

- **Email Classification**: Categorizes incoming emails as spam or ham.
- **User Registration and Login**: Secure account creation and authentication.
- **Real-Time Email Classification**: Classifies emails in real time.
- **User Dashboard**: Users can view their email history and classifications.
- **Machine Learning Model**: Employs a trained model to classify emails.
- **Customization**: Users can configure spam filter settings.

## Technologies Used

- Flask (Python Web Framework)
- HTML, CSS, and JavaScript (Frontend)
- MySQL (Database)
- Machine Learning Libraries (e.g., Scikit-Learn)

## Getting Started

To use the Spam Mail Classification app, follow these steps:

1. Clone this repository to your local machine.
2. Set up the Flask backend and MySQL database as described in the documentation.
3. `pip install`s are
```bash
    pip install Flask
    pip install nltk
    pip install mysql-connector-python
```
5. Create a `SMC` Database & Table 
```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255),
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(15),
        password VARCHAR(255)
    );
```
6. Run the Flask app using `python app.py`.


## Author

- Niladri Chatterjee

