document.addEventListener("touchstart", on_touch);  
document.addEventListener("mousedown", on_touch);   

var recognition = new webkitSpeechRecognition();  
recognition.lang = 'en-US'; 
var recognition_started = false;  

function on_touch() {
    if (!recognition_started && recognition.start) {
        recognition.start();  
        recognition_started = true; 
        document.getElementById("text").innerHTML = "Ascult... Spune ceva!";
        console.log("Recunoașterea vocală a început.");
    }
}

function onend() {
    recognition.stop();  
    recognition_started = false;  
    document.getElementById("text").innerHTML = "Recunoașterea s-a oprit. Atinge din nou pentru a începe.";
    console.log("Recunoașterea vocală s-a oprit.");
}

recognition.onend = onend;
recognition.onsoundend = onend;
recognition.onspeechend = onend;

function on_results(e) {
    var transcript = e.results[0][0].transcript;  
    var confidence = e.results[0][0].confidence;  

    document.getElementById("text").innerHTML = "Ați rostit: " + transcript + "<br>Acuratețe: " + (confidence * 100).toFixed(2) + "%";
    console.log("Text rostit: ", transcript, " | Acuratețe: ", confidence);
}

recognition.onerror = function(event) {
    document.getElementById("text").innerHTML = "A apărut o eroare: " + event.error;
    console.error("Eroare recunoaștere vocală: ", event.error);
    if (event.error === 'network') {
        console.error("Verifică conexiunea la internet sau permisiunile microfonului.");
    }
};

recognition.onresult = on_results;
