
const changeTextBtn = document.getElementById('changeTextBtn');
const displayText = document.getElementById('displayText');


const messages = [
    "You clicked the button!",
    "JavaScript is fun!",
    "Hello from the DOM!",
    "This text just changed!",
    "Keep learning and coding!"
];

let messageIndex = 0; 

changeTextBtn.addEventListener('click', () => {
    displayText.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
});



