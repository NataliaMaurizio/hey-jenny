window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

var recognition = null;

if ('SpeechRecognition' in window) {
    console.warn("Speech Recognition is supported");

    recognition = new window.SpeechRecognition();

    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        console.log(speechToText);
    };

    recognition.start();




} else {
    console.warn("Speech Recognition not supported");
}

function abort() {
    recognition.abort();
}