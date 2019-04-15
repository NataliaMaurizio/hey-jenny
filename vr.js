window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;


var recognition = null;

listening = false;

// get the video when code is injected
video = document.getElementsByTagName("video")[0];


if ('SpeechRecognition' in window) {
    console.warn("Speech Recognition is supported");

    recognition = new window.SpeechRecognition();

    recognition.lang = 'it-IT';

    // get all the voice commands and then return
    recognition.interimResults = true;

    // in case of false it returns single results for each recognition
    recognition.continuous = true;

    recognition.maxAlternatives = 10;



    recognition.onresult = (event) => {

        for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
            const speechToText = event.results[i][0].transcript;

            if (event.results[i].isFinal) {

                if (speechToText.toLowerCase().includes('alessia')) {
                    console.warn("start listening...");

                    video.volume = 0.2;
                    listening = true;

                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve("ok");
                        }, 4500);
                    }).then(function success(data) {
                        video.volume = 1;
                        listening = false;

                        console.warn("stop listening...");
                    }, function error(err) {

                    });

                }

                if (listening) {
                    if (speechToText.toLowerCase().includes('stop') ||
                        speechToText.toLowerCase().includes('pause')) {
                        console.warn("stop video");
                        video.pause();
                    }

                    else if (speechToText.toLowerCase().includes('play')) {
                        console.warn("play video");
                        video.play();
                    }
                }





            }

        }

    };

    recognition.start();
    console.log('Speech recognition started');

} else {
    console.warn("Speech Recognition not supported");
}

function abort() {
    recognition.abort();
}

function resetAudio() {
    video.volume = 1.0;
}
