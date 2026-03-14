// Usamos let para permitir o acesso global dentro deste arquivo
let intervalId = 0;
let timer = 0; 
const timeEl = document.querySelector("#timer");

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    // Removi os centésimos do return para ficar HH:MM:SS, mas o cálculo continua preciso
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const setTimer = (time) => {
    if (timeEl) timeEl.innerText = formatTime(time);
}

const toggleTimer = () => {
    const button = document.querySelector("#power");
    const action = button.getAttribute("action");

    if (action === "start" || action === "continue") {
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        
        button.setAttribute("action", "pause");
        button.innerHTML = '<i class="material-icons">pause</i>';
    } else {
        clearInterval(intervalId);
        button.setAttribute("action", "continue");
        button.innerHTML = '<i class="material-icons">play_arrow</i>';
    }
}

// Event Listeners
document.getElementById("power").addEventListener("click", toggleTimer);

// Função para o botão de Reset (Redo)
document.getElementById("reset").addEventListener("click", () => {
    clearInterval(intervalId);
    timer = 0;
    setTimer(timer);
    const button = document.querySelector("#power");
    button.setAttribute("action", "start");
    button.innerHTML = '<i class="material-icons">play_arrow</i>';
});

// Event Listener para o botão de Salvar (Disquete)
document.getElementById("save-timer").addEventListener("click", () => {
    // 1. Pega o tempo atual usando a sua função formatTime
    const tempoFormatado = formatTime(timer);
    
    // 2. Localiza o input de tempo no seu formulário
    const inputTempo = document.getElementById("input-tempo");

    if (inputTempo) {
        // 3. Define o valor do input com o tempo do cronômetro
        inputTempo.value = tempoFormatado;

        // 4. Feedback visual: Pausa o cronômetro automaticamente ao salvar
        const powerBtn = document.querySelector("#power");
        if (powerBtn.getAttribute("action") === "pause") {
            toggleTimer(); 
        }
        
        // Opcional: Efeito de brilho no input para mostrar que foi preenchido
        inputTempo.style.borderColor = "#8a2be2";
        setTimeout(() => {
            inputTempo.style.borderColor = "#333";
        }, 1000);
    }
});

// O timer do seu cronômetro está em centésimos (10ms)
// 100 centésimos = 1 segundo
// 6000 centésimos = 1 minuto

const converterTimerParaMinutos = (valorTimer) => {
    // Divide por 6000 para ter o total em minutos
    // Ex: 9000 centésimos -> 1.5 minutos (1min e 30s)
    let minutos = valorTimer / 6000;
    return parseFloat(minutos.toFixed(2)); // Retorna como float com 2 casas
};