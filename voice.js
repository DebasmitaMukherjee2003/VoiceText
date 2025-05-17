
const clicktoconvert = document.getElementById('clicktoconvert');
const convertText = document.getElementById('convert_text');

if (clicktoconvert && convertText) {
    // Ensure that SpeechRecognition is available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        
        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join(''); 
            
            convertText.value = transcript;
        });
        
        recognition.addEventListener('error', e => {
            console.error('Speech recognition error detected: ', e.error);
        });

        recognition.addEventListener('end', () => {
            console.log('Speech recognition service disconnected');
        });
        
        clicktoconvert.addEventListener('click', function() {
            recognition.start();
        });
    } else {
        console.error('Speech Recognition API is not supported in this browser.');
    }
} else {
    console.error('Element with id "clicktoconvert" or "convert_text" not found.');
}

