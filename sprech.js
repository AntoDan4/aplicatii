// Ascultăm pentru click pe butoane
document.getElementById("startButton").addEventListener("click", startRecognition);
document.getElementById("stopButton").addEventListener("click", stopRecognition);

// Inițializăm recunoașterea vocală
var recognition = new webkitSpeechRecognition();  
recognition.lang = 'en-US'; 
var recognition_started = false;  

// Funcția care pornește recunoașterea vocală
function startRecognition() {
    if (!recognition_started) {
        recognition.start();  
        recognition_started = true; 
        document.getElementById("text").innerHTML = "Ascult... Spune ceva!";
        console.log("Recunoașterea vocală a început.");
    }
}

// Funcția care oprește recunoașterea vocală
function stopRecognition() {
    if (recognition_started) {
        recognition.stop();  
        recognition_started = false;  
        document.getElementById("text").innerHTML = "Recunoașterea s-a oprit. Apasă Start pentru a începe.";
        console.log("Recunoașterea vocală s-a oprit.");
    }
}

// Asignăm funcțiile la evenimentele corespunzătoare
recognition.onend = stopRecognition;
recognition.onsoundend = stopRecognition;
recognition.onspeechend = stopRecognition;

// Funcția care gestionează rezultatele recunoașterii
recognition.onresult = function(e) {
    var transcript = e.results[0][0].transcript;  
    var confidence = e.results[0][0].confidence;  

    document.getElementById("text").innerHTML = "Ați rostit: " + transcript + "<br>Acuratețe: " + (confidence * 100).toFixed(2) + "%";
    console.log("Text rostit: ", transcript, " | Acuratețe: ", confidence);
};

// Funcția care gestionează erorile de recunoaștere
recognition.onerror = function(event) {
    document.getElementById("text").innerHTML = "A apărut o eroare: " + event.error;
    console.error("Eroare recunoaștere vocală: ", event.error);
    if (event.error === 'network') {
        console.error("Verifică conexiunea la internet sau permisiunile microfonului.");
    }
};
