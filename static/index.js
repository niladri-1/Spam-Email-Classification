// Add an event listener for the form submission
document.getElementById("prediction-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Make an AJAX request to get the prediction result
    fetch("/predict", {
        method: "POST",
        body: new FormData(this)
    })
        .then(response => response.text())
        .then(result => {
            // Display the result in the "result-container" div
            document.getElementById("result-container").innerHTML = result;
        })
        .catch(error => console.error(error));
});

// Add an event listener for the "Clear" button
document.getElementById("clear-button").addEventListener("click", function (e) {
    // Clear the textarea and the result container
    document.getElementById("message").value = "";
    document.getElementById("result-container").innerHTML = "";
});


const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check the user's preferred theme
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set the initial theme based on user preference or default to light
if (userPrefersDark) {
    body.classList.add('dark-mode');
} else {
    body.classList.add('light-mode');
}

// Toggle between light and dark mode
themeToggle.addEventListener('click', function () {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
});


const messageTextArea = document.getElementById('message');
const clearButton = document.getElementById('clear-button');

// Add a click event listener to the clear button
clearButton.addEventListener('click', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Clear the text in the text area
    messageTextArea.value = '';
});

