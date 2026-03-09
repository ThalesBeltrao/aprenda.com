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