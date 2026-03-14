document.addEventListener("DOMContentLoaded", function(){

    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("days");
    const prevButton = document.getElementById("prev")
    const nextButton = document.getElementById("next")

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  let currentDate = new Date();
  let today = new Date();


  function renderCalendar(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${months[month]} ${year}`;

    daysContainer.innerHTML = "";

    //Previous month's dates
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay; i > 0; i--){
        const dayDiv = document.createElement("div");
        dayDiv.textContent = prevMonthLastDay - i + 1;
        dayDiv.classList.add("fade");
        daysContainer.appendChild(dayDiv);
    }
    
    // Current month's dates 
   for (let i = 1; i <= lastDay; i++){
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    dayDiv.style.cursor = "pointer"; // Indica que é clicável

    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
        dayDiv.classList.add("today");
    }
    // EVENTO DE CLIQUE PARA PEGAR A DATA
    dayDiv.addEventListener("click", function() {
        // Formata a data como DD/MM/AAAA
        const selectedDate = `${i.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
        
        // Insere no input do formulário
        const inputData = document.getElementById("Data");
        if (inputData) {
            inputData.value = selectedDate;
        }
    });

    daysContainer.appendChild(dayDiv);

    }
   // Next month's dates
    const totalCells = daysContainer.children.length; // Quantos dias já colocamos (passado + atual)
     

    const remaining = 42 - totalCells; // 42 é o padrão de 6 linhas x 7 colunas

    for (let i = 1; i <= remaining; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    dayDiv.classList.add("fade");
    daysContainer.appendChild(dayDiv);
}

  }
  prevButton.addEventListener("click", function(){
        currentDate.setMonth(currentDate.getMonth() - 1)
        renderCalendar(currentDate);
  });

  nextButton.addEventListener("click", function(){
        currentDate.setMonth(currentDate.getMonth() + 1)
        renderCalendar(currentDate);
  });

 renderCalendar(currentDate);

});

